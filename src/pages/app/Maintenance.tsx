import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Battery, Disc, Lightbulb, Wind, Shield } from "lucide-react";

const services = [
  { icon: Wrench, label: "General Service", price: "Free", desc: "Full diagnostics & tune-up" },
  { icon: Battery, label: "Battery Swap", price: "₹0", desc: "Instant in 2 minutes" },
  { icon: Disc, label: "Brake Service", price: "₹299", desc: "Pads & alignment" },
  { icon: Wind, label: "Tyre Replacement", price: "₹1,200", desc: "Per tyre" },
  { icon: Lightbulb, label: "Electrical Check", price: "Free", desc: "Lights & wiring" },
  { icon: Shield, label: "Insurance Renewal", price: "₹1,499", desc: "Annual cover" },
];

const history = [
  { date: "20 Apr 2026", type: "Tyre Replacement", cost: 1200, mechanic: "Rakesh, Saket Hub" },
  { date: "05 Apr 2026", type: "General Service", cost: 0, mechanic: "Suresh, Saket Hub" },
  { date: "12 Mar 2026", type: "Battery Swap", cost: 0, mechanic: "Auto Swap" },
];

const Maintenance = () => (
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
      <Card className="divide-y divide-border">
        {history.map((h, i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-sm">{h.type}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{h.date} · {h.mechanic}</p>
            </div>
            <span className="font-display font-bold text-sm">{h.cost === 0 ? "Free" : `₹${h.cost}`}</span>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

export default Maintenance;
