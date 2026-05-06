import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Trash2, Shield, ShieldOff, Bike, Truck } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type Row = {
  id: string;
  full_name: string | null;
  phone: string | null;
  active_role: string;
  created_at: string;
  roles: string[];
};

const AdminUsers = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    const { data: allRoles } = await supabase.from("user_roles").select("user_id, role");
    const grouped = new Map<string, string[]>();
    (allRoles ?? []).forEach((r: any) => {
      const arr = grouped.get(r.user_id) ?? [];
      arr.push(r.role);
      grouped.set(r.user_id, arr);
    });
    setRows((profiles ?? []).map((p: any) => ({ ...p, roles: grouped.get(p.id) ?? [] })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleRole = async (uid: string, role: "admin" | "rider" | "subscriber", has: boolean) => {
    if (has) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", uid).eq("role", role);
      if (error) return toast.error(error.message);
      toast.success(`Removed ${role}`);
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: uid, role });
      if (error) return toast.error(error.message);
      toast.success(`Granted ${role}`);
    }
    load();
  };

  const deleteUser = async (uid: string) => {
    if (uid === user?.id) return toast.error("You can't delete yourself.");
    if (!confirm("Delete this profile? Their data will be cascaded by Supabase auth deletion only — this just removes the profile row.")) return;
    const { error } = await supabase.from("profiles").delete().eq("id", uid);
    if (error) return toast.error(error.message);
    toast.success("Profile removed");
    load();
  };

  const filtered = rows.filter((r) =>
    !search || (r.full_name ?? "").toLowerCase().includes(search.toLowerCase()) || (r.phone ?? "").includes(search)
  );

  return (
    <div>
      <header className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">{rows.length} total · manage roles &amp; access</p>
        </div>
        <Input placeholder="Search name or phone…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
      </header>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Loading…</TableCell></TableRow>}
            {!loading && filtered.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No users</TableCell></TableRow>}
            {filtered.map((r) => {
              const isAdmin = r.roles.includes("admin");
              const isRider = r.roles.includes("rider");
              const isSub = r.roles.includes("subscriber");
              return (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.full_name || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{r.phone || "—"}</TableCell>
                  <TableCell><span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase">{r.active_role}</span></TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {r.roles.map((rl) => (
                        <span key={rl} className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-bold uppercase">{rl}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost" title={isAdmin ? "Demote admin" : "Make admin"} onClick={() => toggleRole(r.id, "admin", isAdmin)}>
                        {isAdmin ? <ShieldOff className="h-4 w-4 text-destructive" /> : <Shield className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant="ghost" title="Toggle subscriber" onClick={() => toggleRole(r.id, "subscriber", isSub)}>
                        <Bike className={`h-4 w-4 ${isSub ? "text-primary" : "text-muted-foreground"}`} />
                      </Button>
                      <Button size="sm" variant="ghost" title="Toggle rider" onClick={() => toggleRole(r.id, "rider", isRider)}>
                        <Truck className={`h-4 w-4 ${isRider ? "text-primary" : "text-muted-foreground"}`} />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteUser(r.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;
