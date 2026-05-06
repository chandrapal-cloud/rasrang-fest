import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Calendar, CreditCard, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const plans = [
  { name: "Daily", price: 249, period: "/ day", desc: "Perfect for trying BHAR" },
  { name: "Weekly", price: 1499, period: "/ week", desc: "Save 15% vs daily" },
  { name: "Monthly", price: 4999, period: "/ month", desc: "Best for full-time riders", badge: "Best value" as const },
];

const Subscription = () => {
  const { user } = useAuth();
  const [active, setActive] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from("subscriptions").select("*").eq("status", "active").order("created_at", { ascending: false }).limit(1).maybeSingle();
    setActive(data);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const subscribe = async (plan: typeof plans[number]) => {
    if (!user) return;
    if (active) await supabase.from("subscriptions").update({ status: "cancelled", end_date: new Date().toISOString().slice(0,10) }).eq("id", active.id);
    const start = new Date();
    const end = new Date(); end.setMonth(end.getMonth() + (plan.name === "Monthly" ? 1 : plan.name === "Weekly" ? 0 : 0));
    if (plan.name === "Weekly") end.setDate(end.getDate() + 7);
    if (plan.name === "Daily") end.setDate(end.getDate() + 1);
    const { error } = await supabase.from("subscriptions").insert({
      user_id: user.id, plan_name: plan.name, monthly_fee: plan.price,
      start_date: start.toISOString().slice(0,10), end_date: end.toISOString().slice(0,10), status: "active",
    });
    if (error) return toast.error(error.message);
    toast.success(`Subscribed to ${plan.name}`);
    load();
  };

  const cancel = async () => {
    if (!active) return;
    await supabase.from("subscriptions").update({ status: "cancelled", end_date: new Date().toISOString().slice(0,10) }).eq("id", active.id);
    toast.success("Subscription cancelled");
    load();
  };

  return (
    <div className="pb-6">
      <PageHeader title="Subscription" subtitle="Your BHAR EV plan" />

      <div className="px-5 -mt-6">
        {loading ? <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-primary"/></div> : active ? (
          <Card className="bg-gradient-primary text-primary-foreground p-5 border-0 shadow-glow">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">Active plan</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase">{active.status}</span>
            </div>
            <h2 className="font-display text-2xl font-bold">{active.plan_name}</h2>
            <p className="font-display text-3xl font-bold mt-2">₹{Number(active.monthly_fee).toLocaleString()}</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/15 p-2.5"><Calendar className="h-3.5 w-3.5 mb-1" /><p className="text-[10px] opacity-80">Renews</p><p className="text-sm font-bold">{active.end_date ? new Date(active.end_date).toLocaleDateString() : "—"}</p></div>
              <div className="rounded-xl bg-white/15 p-2.5"><CreditCard className="h-3.5 w-3.5 mb-1" /><p className="text-[10px] opacity-80">Started</p><p className="text-sm font-bold">{new Date(active.start_date).toLocaleDateString()}</p></div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 text-center"><p className="text-sm text-muted-foreground">No active subscription. Choose a plan below.</p></Card>
        )}
      </div>

      <div className="px-5 mt-5">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Included</h3>
        <Card className="p-4 space-y-2.5">
          {["Unlimited kilometers", "Free general service every 30 days", "Roadside assistance 24×7", "Insurance & registration", "Free battery swaps at hubs"].map((b) => (
            <div key={b} className="flex items-center gap-3 text-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15"><Check className="h-3 w-3 text-success" /></div>
              {b}
            </div>
          ))}
        </Card>
      </div>

      <div className="px-5 mt-6">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Plans</h3>
        <div className="space-y-3">
          {plans.map((p) => (
            <Card key={p.name} className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display font-bold">{p.name}</p>
                  {"badge" in p && <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-bold uppercase">{p.badge}</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <p className="font-display font-bold">₹{p.price.toLocaleString()}<span className="text-[11px] font-normal text-muted-foreground">{p.period}</span></p>
                <Button size="sm" variant="outline" onClick={() => subscribe(p)}>Subscribe</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {active && (
        <div className="px-5 mt-5 flex gap-3">
          <Button variant="outline" className="flex-1 h-12 rounded-xl"><FileText className="h-4 w-4 mr-2" /> Invoices</Button>
          <Button variant="outline" onClick={cancel} className="flex-1 h-12 rounded-xl text-destructive">Cancel</Button>
        </div>
      )}
    </div>
  );
};
export default Subscription;
