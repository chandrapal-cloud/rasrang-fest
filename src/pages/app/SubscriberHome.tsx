import { AppHeader } from "@/components/AppHeader";
import { Link } from "react-router-dom";
import { Battery, MapPin, Wrench, Calendar, Zap, ChevronRight, TrendingUp } from "lucide-react";
import bikeAngle from "@/assets/bhar-bike-angle.jpeg";
import { Card } from "@/components/ui/card";

const SubscriberHome = () => {
  const battery = 78;
  const range = 64;

  return (
    <div className="pb-6">
      <AppHeader subtitle="Your BHAR EV is ready to ride" />

      {/* Bike status hero card */}
      <div className="px-5 -mt-10">
        <Card className="overflow-hidden bg-gradient-card shadow-card border-0">
          <div className="relative p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">My Bike</p>
                <h2 className="font-display text-xl font-bold text-foreground mt-1">BHAR Cargo Pro</h2>
                <p className="text-xs text-muted-foreground">DL 8C XX 4521</p>
              </div>
              <span className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success uppercase">
                ● Parked
              </span>
            </div>

            <div className="relative h-32 -mx-2 my-2 flex items-center justify-center">
              <img src={bikeAngle} alt="BHAR Bike" className="max-h-full object-contain drop-shadow-md" />
            </div>

            {/* Battery */}
            <div className="rounded-2xl bg-secondary text-secondary-foreground p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Battery</span>
                </div>
                <span className="font-display text-2xl font-bold">{battery}%</span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-primary animate-battery-fill"
                  style={{ ["--fill" as any]: `${battery}%`, width: `${battery}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Range: {range} km</span>
                <span>Health: 95%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="px-5 mt-5">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Quick actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { to: "/app/tracker", icon: MapPin, label: "GPS" },
            { to: "/app/maintenance", icon: Wrench, label: "Service" },
            { to: "/app/bookings", icon: Calendar, label: "Book" },
            { to: "/app/subscription", icon: Zap, label: "Plan" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Subscription card */}
      <div className="px-5 mt-6">
        <Link to="/app/subscription">
          <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-glow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-80">Active subscription</p>
                <h3 className="font-display text-xl font-bold mt-1">Cargo Pro Monthly</h3>
                <p className="text-xs mt-1 opacity-90">Renews in 12 days · ₹4,999/mo</p>
              </div>
              <ChevronRight className="h-5 w-5" />
            </div>
            <div className="mt-4 flex gap-2">
              {["Unlimited km", "Free service", "Insurance"].map((b) => (
                <span key={b} className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold">{b}</span>
              ))}
            </div>
          </Card>
        </Link>
      </div>

      {/* Insights */}
      <div className="px-5 mt-6">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">This month</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs">Distance</span>
              <TrendingUp className="h-3.5 w-3.5 text-success" />
            </div>
            <p className="font-display text-2xl font-bold mt-1">428 km</p>
            <p className="text-[11px] text-success">+12% vs last month</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs">CO₂ saved</span>
              <Zap className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="font-display text-2xl font-bold mt-1">52 kg</p>
            <p className="text-[11px] text-muted-foreground">≈ 8 trees planted</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriberHome;
