import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock, Package, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Status = "available" | "ongoing" | "completed";

const tabs: { key: Status; label: string }[] = [
  { key: "available", label: "Available" },
  { key: "ongoing", label: "Ongoing" },
  { key: "completed", label: "Completed" },
];

const Deliveries = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<Status>("available");
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase.from("deliveries").select("*").order("created_at", { ascending: false });
    setList(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const accept = async (id: string) => {
    const { error } = await supabase.from("deliveries").update({ status: "ongoing" }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Order accepted");
    setTab("ongoing"); load();
  };
  const complete = async (row: any) => {
    const { error } = await supabase.from("deliveries").update({ status: "completed", completed_at: new Date().toISOString() }).eq("id", row.id);
    if (error) return toast.error(error.message);
    // upsert today's earning
    if (user) {
      const today = new Date().toISOString().slice(0, 10);
      const { data: existing } = await supabase.from("earnings").select("*").eq("rider_id", user.id).eq("date", today).maybeSingle();
      if (existing) {
        await supabase.from("earnings").update({
          total: Number(existing.total) + Number(row.payout),
          deliveries_count: existing.deliveries_count + 1,
        }).eq("id", existing.id);
      } else {
        await supabase.from("earnings").insert({ rider_id: user.id, date: today, total: row.payout, deliveries_count: 1 });
      }
    }
    toast.success(`+₹${row.payout} added to earnings`);
    load();
  };

  const filtered = list.filter((d) => d.status === tab);

  return (
    <div className="pb-6">
      <PageHeader title="Deliveries" subtitle="Manage your delivery jobs" />

      <div className="px-5 mt-4">
        <div className="flex gap-2 rounded-2xl bg-muted p-1.5">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition ${tab === t.key ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {loading && <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>}
        {!loading && filtered.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No {tab} deliveries</p>
          </Card>
        )}
        {filtered.map((d) => (
          <Card key={d.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] text-muted-foreground">#{d.id.slice(0, 8)}</p>
                <p className="font-semibold">{d.customer_name}</p>
              </div>
              <p className="font-display text-xl font-bold text-primary">₹{d.payout}</p>
            </div>
            <div className="space-y-1.5 text-xs mb-3">
              <div className="flex items-start gap-2"><div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" /><span>{d.pickup_address}</span></div>
              <div className="flex items-start gap-2"><MapPin className="h-3 w-3 text-success mt-0.5 shrink-0" /><span>{d.drop_address}</span></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Navigation className="h-3 w-3" /> {d.distance_km} km</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(d.created_at).toLocaleDateString()}</span>
            </div>
            {d.status === "available" && <Button onClick={() => accept(d.id)} className="w-full rounded-full bg-gradient-primary text-primary-foreground">Accept Order</Button>}
            {d.status === "ongoing" && <Button onClick={() => complete(d)} className="w-full rounded-full bg-success text-success-foreground hover:opacity-90"><CheckCircle2 className="h-4 w-4 mr-1" /> Mark Delivered</Button>}
            {d.status === "completed" && <div className="text-center text-xs font-semibold text-success">✓ Delivered</div>}
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Deliveries;
