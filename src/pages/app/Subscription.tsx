import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Calendar, CreditCard, FileText } from "lucide-react";

const plans = [
  { name: "Daily", price: 249, period: "/ day", desc: "Perfect for trying BHAR", badge: null },
  { name: "Weekly", price: 1499, period: "/ week", desc: "Save 15% vs daily", badge: "Popular" },
  { name: "Monthly", price: 4999, period: "/ month", desc: "Best for full-time riders", badge: "Best value" },
];

const Subscription = () => (
  <div className="pb-6">
    <PageHeader title="Subscription" subtitle="Your BHAR EV plan" />

    {/* Active plan */}
    <div className="px-5 -mt-6">
      <Card className="bg-gradient-primary text-primary-foreground p-5 border-0 shadow-glow">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">Active plan</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase">Auto-renew</span>
        </div>
        <h2 className="font-display text-2xl font-bold">Cargo Pro Monthly</h2>
        <p className="font-display text-3xl font-bold mt-2">₹4,999<span className="text-base font-medium opacity-80">/mo</span></p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white/15 p-2.5">
            <Calendar className="h-3.5 w-3.5 mb-1" />
            <p className="text-[10px] opacity-80">Next billing</p>
            <p className="text-sm font-bold">07 May</p>
          </div>
          <div className="rounded-xl bg-white/15 p-2.5">
            <CreditCard className="h-3.5 w-3.5 mb-1" />
            <p className="text-[10px] opacity-80">Payment</p>
            <p className="text-sm font-bold">UPI · ****@ok</p>
          </div>
        </div>
      </Card>
    </div>

    {/* What's included */}
    <div className="px-5 mt-5">
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Included</h3>
      <Card className="p-4 space-y-2.5">
        {["Unlimited kilometers", "Free general service every 30 days", "Roadside assistance 24×7", "Insurance & registration", "Free battery swaps at hubs"].map((b) => (
          <div key={b} className="flex items-center gap-3 text-sm">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15">
              <Check className="h-3 w-3 text-success" />
            </div>
            {b}
          </div>
        ))}
      </Card>
    </div>

    {/* Upgrade plans */}
    <div className="px-5 mt-6">
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Other plans</h3>
      <div className="space-y-3">
        {plans.map((p) => (
          <Card key={p.name} className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display font-bold">{p.name}</p>
                {p.badge && <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-bold uppercase">{p.badge}</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold">₹{p.price.toLocaleString()}</p>
              <p className="text-[11px] text-muted-foreground">{p.period}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>

    <div className="px-5 mt-5 flex gap-3">
      <Button variant="outline" className="flex-1 h-12 rounded-xl"><FileText className="h-4 w-4 mr-2" /> Invoices</Button>
      <Button variant="outline" className="flex-1 h-12 rounded-xl text-destructive">Cancel</Button>
    </div>
  </div>
);

export default Subscription;
