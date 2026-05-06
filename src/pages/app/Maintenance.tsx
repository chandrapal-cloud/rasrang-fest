import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Wrench, Battery, Disc, Lightbulb, Wind, Shield, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const services = [
  { icon: Wrench, label: "General Service", price: "Free", desc: "Full diagnostics & tune-up" },
  { icon: Battery, label: "Battery Swap", price: "₹0", desc: "Instant in 2 minutes" },
  { icon: Disc, label: "Brake Service", price: "₹299", desc: "Pads & alignment" },
  { icon: Wind, label: "Tyre Replacement", price: "₹1,200", desc: "Per tyre" },
  { icon: Lightbulb, label: "Electrical Check", price: "Free", desc: "Lights & wiring" },
  { icon: Shield, label: "Insurance Renewal", price: "₹1,499", desc: "Annual cover" },
];

const Maintenance = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("maintenance_records").select("*").order("performed_at", { ascending: false });
      setHistory(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="pb-6">
      <PageHeader title="Service Center" subtitle="Keep your BHAR EV in top shape" />

      <div className="px-5 mt-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Book a service</h3>
        <div className="grid grid-cols-2 gap-3">
          {services.map(({ icon: Icon, label, price, desc }) => (
            <Card key={label} className="p-4 hover:shadow-card transition cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground mb-2.5">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-sm text-foreground">{label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
              <p className="text-xs font-bold text-primary mt-2">{price}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="px-5 mt-7">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">History</h3>
        {loading ? (
          <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
        ) : history.length === 0 ? (
          <Card className="p-6 text-center text-sm text-muted-foreground">No service history yet.</Card>
        ) : (
          <Card className="divide-y divide-border">
            {history.map((h) => (
              <div key={h.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold text-sm">{h.service_type}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {new Date(h.performed_at).toLocaleDateString()} {h.mechanic && `· ${h.mechanic}`}
                  </p>
                </div>
                <span className="font-display font-bold text-sm">{Number(h.cost) === 0 ? "Free" : `₹${h.cost}`}</span>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};
export default Maintenance;
