import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  confirmed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

const Bookings = () => {
  const { user } = useAuth();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ service_type: "General Service", scheduled_at: "", notes: "" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase.from("bookings").select("*").order("scheduled_at", { ascending: false });
    setList(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const create = async () => {
    if (!user || !form.scheduled_at) return toast.error("Pick a date and time");
    setBusy(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id, service_type: form.service_type,
      scheduled_at: new Date(form.scheduled_at).toISOString(), notes: form.notes,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Booking created");
    setOpen(false); setForm({ service_type: "General Service", scheduled_at: "", notes: "" });
    load();
  };

  return (
    <div className="pb-6">
      <PageHeader title="Bookings" subtitle="Manage your service appointments" />
      <div className="px-5 -mt-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-13 py-3 rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
              <Plus className="h-4 w-4 mr-2" /> New Booking
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Book a service</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Service type</Label>
                <select className="mt-1 w-full h-11 rounded-xl border border-input bg-background px-3 text-sm"
                  value={form.service_type} onChange={(e) => setForm({ ...form, service_type: e.target.value })}>
                  {["General Service", "Battery Swap", "Brake Service", "Tyre Replacement", "Electrical Check"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div><Label>Date &amp; time</Label>
                <Input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} />
              </div>
              <div><Label>Notes</Label>
                <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Optional details"/>
              </div>
            </div>
            <DialogFooter><Button onClick={create} disabled={busy}>{busy ? "Saving…" : "Confirm booking"}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="px-5 mt-6 space-y-3">
        {loading && <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>}
        {!loading && list.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground text-sm">No bookings yet. Create one above.</Card>
        )}
        {list.map((b) => (
          <Card key={b.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] text-muted-foreground">#{b.id.slice(0, 8)}</p>
                <p className="font-semibold text-foreground">{b.service_type}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[b.status] ?? "bg-muted"}`}>{b.status}</span>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {new Date(b.scheduled_at).toLocaleString()}</div>
              {b.notes && <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {b.notes}</div>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
