import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Users, Bike, Truck, CreditCard, IndianRupee, CalendarCheck } from "lucide-react";

const AdminOverview = () => {
  const [stats, setStats] = useState({ users: 0, bikes: 0, bookings: 0, deliveries: 0, subs: 0, revenue: 0 });

  useEffect(() => {
    (async () => {
      const [u, b, bk, d, s, e] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("bikes").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("deliveries").select("id", { count: "exact", head: true }),
        supabase.from("subscriptions").select("id", { count: "exact", head: true }),
        supabase.from("earnings").select("total"),
      ]);
      const revenue = (e.data ?? []).reduce((sum: number, r: any) => sum + Number(r.total || 0), 0);
      setStats({
        users: u.count ?? 0, bikes: b.count ?? 0, bookings: bk.count ?? 0,
        deliveries: d.count ?? 0, subs: s.count ?? 0, revenue,
      });
    })();
  }, []);

  const items = [
    { icon: Users, label: "Total users", value: stats.users },
    { icon: Bike, label: "Bikes in fleet", value: stats.bikes },
    { icon: CalendarCheck, label: "Bookings", value: stats.bookings },
    { icon: Truck, label: "Deliveries", value: stats.deliveries },
    { icon: CreditCard, label: "Active subs", value: stats.subs },
    { icon: IndianRupee, label: "Total payouts", value: `₹${stats.revenue.toLocaleString()}` },
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Live snapshot of your BHAR fleet.</p>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((i) => (
          <Card key={i.label} className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <i.icon className="h-5 w-5" />
            </div>
            <p className="font-display text-2xl md:text-3xl font-bold mt-3">{i.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{i.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
