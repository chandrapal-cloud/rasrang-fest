import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { TrendingUp, Package, Clock, Award, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Earnings = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const since = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10);
      const { data } = await supabase.from("earnings").select("*").gte("date", since).order("date");
      setRows(data ?? []);
      setLoading(false);
    })();
  }, [user]);

  // Build last 7 days
  const days: { day: string; amount: number; deliveries: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    const r = rows.find((x) => x.date === key);
    days.push({ day: d.toLocaleDateString(undefined, { weekday: "short" }), amount: Number(r?.total ?? 0), deliveries: r?.deliveries_count ?? 0 });
  }
  const total = days.reduce((s, w) => s + w.amount, 0);
  const orders = days.reduce((s, w) => s + w.deliveries, 0);
  const max = Math.max(1, ...days.map((w) => w.amount));
  const avg = orders > 0 ? Math.round(total / orders) : 0;

  return (
    <div className="pb-6">
      <PageHeader title="Earnings" subtitle="Your income & insights" />

      <div className="px-5 -mt-6">
        <Card className="bg-gradient-primary text-primary-foreground p-5 border-0 shadow-glow">
          <p className="text-xs uppercase tracking-wider opacity-80">Last 7 days</p>
          <p className="font-display text-4xl font-bold mt-1">₹{total.toLocaleString()}</p>
          <div className="mt-2 flex items-center gap-1 text-xs">
            <TrendingUp className="h-3.5 w-3.5" /><span>{orders} orders completed</span>
          </div>
        </Card>
      </div>

      <div className="px-5 mt-5">
        <Card className="p-5">
          {loading ? <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-primary"/></div> : (
            <div className="flex items-end justify-between gap-2 h-32">
              {days.map((w, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-full">
                    <div className="w-full rounded-t-md bg-gradient-primary shadow-soft" style={{ height: `${(w.amount / max) * 100}%`, minHeight: w.amount > 0 ? 6 : 2 }} />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">{w.day}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        <Card className="p-4"><Package className="h-4 w-4 text-primary" /><p className="font-display text-xl font-bold mt-1">{orders}</p><p className="text-[11px] text-muted-foreground">Deliveries</p></Card>
        <Card className="p-4"><Clock className="h-4 w-4 text-primary" /><p className="font-display text-xl font-bold mt-1">{days.filter(d=>d.amount>0).length}</p><p className="text-[11px] text-muted-foreground">Active days</p></Card>
        <Card className="p-4"><TrendingUp className="h-4 w-4 text-success" /><p className="font-display text-xl font-bold mt-1">₹{avg}</p><p className="text-[11px] text-muted-foreground">Avg per order</p></Card>
        <Card className="p-4"><Award className="h-4 w-4 text-warning" /><p className="font-display text-xl font-bold mt-1">4.9 ★</p><p className="text-[11px] text-muted-foreground">Customer rating</p></Card>
      </div>
    </div>
  );
};
export default Earnings;
