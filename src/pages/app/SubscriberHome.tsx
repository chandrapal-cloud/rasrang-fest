import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Link } from "react-router-dom";
import { Battery, MapPin, Wrench, Calendar, Zap, ChevronRight, TrendingUp, Plus } from "lucide-react";
import bikeAngle from "@/assets/bhar-bike-angle.jpeg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SubscriberHome = () => {
  const { user } = useAuth();
  const [bike, setBike] = useState<any>(null);
  const [sub, setSub] = useState<any>(null);
  const [trips, setTrips] = useState(0);

  const load = async () => {
    if (!user) return;
    const { data: b } = await supabase.from("bikes").select("*").eq("owner_id", user.id).maybeSingle();
    setBike(b);
    const { data: s } = await supabase.from("subscriptions").select("*").eq("status", "active").maybeSingle();
    setSub(s);
    const { count } = await supabase.from("bookings").select("id", { count: "exact", head: true });
    setTrips(count ?? 0);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const addBike = async () => {
    if (!user) return;
    const { error } = await supabase.from("bikes").insert({
      owner_id: user.id, model: "BHAR Cargo Pro", plate_number: "DL 8C XX " + Math.floor(1000 + Math.random()*9000),
      battery_percent: 80, battery_health: 95, range_km: 80, status: "parked",
    });
    if (error) return toast.error(error.message);
    toast.success("Bike linked");
    load();
  };

  if (!bike) {
    return (
      <div className="pb-6">
        <AppHeader subtitle="Welcome to BHAR" />
        <div className="px-5 -mt-10">
          <Card className="p-6 text-center">
            <Battery className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg">No bike linked yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Link your BHAR EV to view live status, battery, and book services.</p>
            <Button onClick={addBike} className="bg-gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1"/> Link my bike</Button>
          </Card>
        </div>
      </div>
    );
  }

  const battery = bike.battery_percent;
  const range = bike.range_km;

  return (
    <div className="pb-6">
      <AppHeader subtitle="Your BHAR EV is ready to ride" />

      <div className="px-5 -mt-10">
        <Card className="overflow-hidden bg-gradient-card shadow-card border-0">
          <div className="relative p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">My Bike</p>
                <h2 className="font-display text-xl font-bold text-foreground mt-1">{bike.model}</h2>
                <p className="text-xs text-muted-foreground">{bike.plate_number}</p>
              </div>
              <span className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success uppercase">● {bike.status}</span>
            </div>

            <div className="relative h-32 -mx-2 my-2 flex items-center justify-center">
              <img src={bikeAngle} alt="BHAR Bike" className="max-h-full object-contain drop-shadow-md" />
            </div>

            <div className="rounded-2xl bg-secondary text-secondary-foreground p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2"><Battery className="h-4 w-4 text-primary" /><span className="text-xs font-semibold uppercase tracking-wider">Battery</span></div>
                <span className="font-display text-2xl font-bold">{battery}%</span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${battery}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Range: {range} km</span>
                <span>Health: {bike.battery_health}%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-5 mt-5">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Quick actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { to: "/app/tracker", icon: MapPin, label: "GPS" },
            { to: "/app/maintenance", icon: Wrench, label: "Service" },
            { to: "/app/bookings", icon: Calendar, label: "Book" },
            { to: "/app/subscription", icon: Zap, label: "Plan" },
          ].map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground"><Icon className="h-5 w-5" /></div>
              <span className="text-[11px] font-semibold text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {sub && (
        <div className="px-5 mt-6">
          <Link to="/app/subscription">
            <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-glow p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-80">Active subscription</p>
                  <h3 className="font-display text-xl font-bold mt-1">{sub.plan_name}</h3>
                  <p className="text-xs mt-1 opacity-90">₹{sub.monthly_fee} · ends {sub.end_date ?? "—"}</p>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Card>
          </Link>
        </div>
      )}

      <div className="px-5 mt-6">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">This month</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center justify-between text-muted-foreground"><span className="text-xs">Distance</span><TrendingUp className="h-3.5 w-3.5 text-success" /></div>
            <p className="font-display text-2xl font-bold mt-1">{Number(bike.odometer_km).toFixed(0)} km</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between text-muted-foreground"><span className="text-xs">Bookings</span><Calendar className="h-3.5 w-3.5 text-primary" /></div>
            <p className="font-display text-2xl font-bold mt-1">{trips}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SubscriberHome;
