import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Battery, Zap, MapPin, Navigation, Lock, Bell, Activity, ThermometerSun } from "lucide-react";

const Tracker = () => {
  const battery = 78;
  return (
    <div className="pb-6">
      <PageHeader title="GPS Tracker" subtitle="Live location · Battery health" />

      {/* Map mock */}
      <div className="px-5 -mt-4">
        <Card className="overflow-hidden border-0 shadow-card h-64 relative">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 70%, hsl(var(--primary)/0.15), transparent 50%), repeating-linear-gradient(0deg, hsl(var(--border)) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, hsl(var(--border)) 0 1px, transparent 1px 40px)",
              backgroundColor: "hsl(var(--muted))",
            }}
          />
          {/* Bike pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping-slow" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
                <Navigation className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="rounded-full bg-secondary text-secondary-foreground px-2.5 py-1 text-[10px] font-semibold">Saket, Delhi</span>
            </div>
          </div>
          <Button size="sm" className="absolute bottom-3 right-3 rounded-full">Recenter</Button>
        </Card>
      </div>

      {/* Battery card */}
      <div className="px-5 mt-4">
        <Card className="bg-secondary text-secondary-foreground p-5 border-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Battery className="h-5 w-5 text-primary" />
              <span className="font-display font-bold">Battery</span>
            </div>
            <span className="rounded-full bg-success/20 px-2.5 py-1 text-[10px] font-bold text-success uppercase">Healthy</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="font-display text-5xl font-bold">{battery}</span>
            <span className="text-lg text-white/60 mb-2">%</span>
          </div>
          <div className="relative mt-3 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-primary"
              style={{ width: `${battery}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-5">
            <div className="rounded-xl bg-white/5 p-3">
              <Zap className="h-3.5 w-3.5 text-primary mb-1" />
              <p className="font-display text-base font-bold">64 km</p>
              <p className="text-[10px] text-white/60">Range</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <ThermometerSun className="h-3.5 w-3.5 text-warning mb-1" />
              <p className="font-display text-base font-bold">32°C</p>
              <p className="text-[10px] text-white/60">Temp</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <Activity className="h-3.5 w-3.5 text-success mb-1" />
              <p className="font-display text-base font-bold">95%</p>
              <p className="text-[10px] text-white/60">Health</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-3">
        {[
          { icon: Lock, label: "Lock" },
          { icon: Bell, label: "Find" },
          { icon: MapPin, label: "Geofence" },
        ].map(({ icon: Icon, label }) => (
          <Card key={label} className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-card transition">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
              <Icon className="h-5 w-5 text-foreground" />
            </div>
            <span className="text-xs font-semibold">{label}</span>
          </Card>
        ))}
      </div>

      {/* Recent trips */}
      <div className="px-5 mt-6">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Recent trips</h3>
        <Card className="divide-y divide-border">
          {[
            { from: "Saket Hub", to: "GK-II", km: 4.2, time: "Today, 2:30 PM" },
            { from: "Home", to: "Saket Hub", km: 1.8, time: "Today, 9:00 AM" },
            { from: "Lajpat Nagar", to: "Defence Colony", km: 2.8, time: "Yesterday" },
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-semibold">{t.from} → {t.to}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.time}</p>
              </div>
              <span className="text-sm font-bold text-primary">{t.km} km</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default Tracker;
