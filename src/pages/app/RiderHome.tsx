import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Battery, MapPin, Navigation, Package, IndianRupee, Clock, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const RiderHome = () => {
  const { user } = useAuth();
  const [online, setOnline] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [todayEarnings, setToday] = useState(0);
  const [todayCount, setCount] = useState(0);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from("deliveries").select("*").in("status", ["available", "ongoing"]).order("created_at", { ascending: false });
    setOrders(data ?? []);
    const today = new Date().toISOString().slice(0, 10);
    const { data: e } = await supabase.from("earnings").select("*").eq("date", today).maybeSingle();
    setToday(Number(e?.total ?? 0));
    setCount(e?.deliveries_count ?? 0);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const accept = async (id: string) => {
    const { error } = await supabase.from("deliveries").update({ status: "ongoing" }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Accepted. Navigate to pickup.");
    load();
  };

  return (
    <div className="pb-6">
      <AppHeader subtitle={online ? "You're online · Accepting orders" : "You're offline"} />

      <div className="px-5 -mt-10">
        <Card className={`p-4 border-0 shadow-card ${online ? "bg-gradient-primary text-primary-foreground" : "bg-card"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${online ? "bg-white/20" : "bg-muted"}`}>
                <span className={`h-3 w-3 rounded-full ${online ? "bg-white animate-pulse" : "bg-muted-foreground"}`} />
              </div>
              <div>
                <p className="font-display font-bold">{online ? "You're Online" : "Go Online"}</p>
                <p className={`text-xs ${online ? "text-white/80" : "text-muted-foreground"}`}>{online ? "Receiving order alerts" : "Tap to start earning"}</p>
              </div>
            </div>
            <Switch checked={online} onCheckedChange={setOnline} />
          </div>
        </Card>
      </div>

      <div className="px-5 mt-4 grid grid-cols-3 gap-3">
        <Card className="p-3 text-center"><IndianRupee className="h-4 w-4 mx-auto text-primary" /><p className="font-display text-lg font-bold mt-1">₹{todayEarnings}</p><p className="text-[10px] text-muted-foreground uppercase tracking-wide">Today</p></Card>
        <Card className="p-3 text-center"><Package className="h-4 w-4 mx-auto text-primary" /><p className="font-display text-lg font-bold mt-1">{todayCount}</p><p className="text-[10px] text-muted-foreground uppercase tracking-wide">Orders</p></Card>
        <Card className="p-3 text-center"><Battery className="h-4 w-4 mx-auto text-success" /><p className="font-display text-lg font-bold mt-1">78%</p><p className="text-[10px] text-muted-foreground uppercase tracking-wide">Battery</p></Card>
      </div>

      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Live orders</h3>
          <Link to="/app/deliveries" className="text-xs text-primary font-semibold">{orders.length} live →</Link>
        </div>
        <div className="space-y-3">
          {orders.length === 0 && (
            <Card className="p-6 text-center text-sm text-muted-foreground">No orders right now. Check back soon — admins assign new ones.</Card>
          )}
          {orders.map((o) => (
            <Card key={o.id} className="p-4 hover:shadow-card transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">#{o.id.slice(0,8)}</p>
                  <p className="font-semibold text-foreground">{o.customer_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-primary">₹{o.payout}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end"><Clock className="h-3 w-3" /> {new Date(o.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2 text-xs"><div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" /><span><span className="text-muted-foreground">Pickup:</span> {o.pickup_address}</span></div>
                <div className="flex items-start gap-2 text-xs"><MapPin className="h-3 w-3 text-success shrink-0 mt-0.5" /><span><span className="text-muted-foreground">Drop:</span> {o.drop_address}</span></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Navigation className="h-3 w-3" /> {o.distance_km} km · <span className="uppercase font-bold">{o.status}</span></span>
                {o.status === "available" && (
                  <Button size="sm" onClick={() => accept(o.id)} className="rounded-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow">
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Accept
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RiderHome;
