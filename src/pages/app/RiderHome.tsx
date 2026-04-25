import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Battery, MapPin, Navigation, Package, IndianRupee, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const mockOrders = [
  { id: "ORD-2841", customer: "Priya S.", pickup: "BHAR Hub, Saket", drop: "Greater Kailash II", distance: 4.2, payout: 85, time: "12 min" },
  { id: "ORD-2842", customer: "Amit K.", pickup: "Lajpat Nagar", drop: "Defence Colony", distance: 2.8, payout: 60, time: "8 min" },
  { id: "ORD-2843", customer: "Neha M.", pickup: "Hauz Khas", drop: "Vasant Vihar", distance: 5.1, payout: 95, time: "15 min" },
];

const RiderHome = () => {
  const [online, setOnline] = useState(true);
  const todayEarnings = 1240;
  const todayOrders = 11;

  const accept = (id: string) => toast.success(`Accepted ${id}. Navigate to pickup.`);

  return (
    <div className="pb-6">
      <AppHeader subtitle={online ? "You're online · Accepting orders" : "You're offline"} />

      {/* Online toggle */}
      <div className="px-5 -mt-10">
        <Card className={`p-4 border-0 shadow-card ${online ? "bg-gradient-primary text-primary-foreground" : "bg-card"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${online ? "bg-white/20" : "bg-muted"}`}>
                <span className={`h-3 w-3 rounded-full ${online ? "bg-white animate-pulse" : "bg-muted-foreground"}`} />
              </div>
              <div>
                <p className="font-display font-bold">{online ? "You're Online" : "Go Online"}</p>
                <p className={`text-xs ${online ? "text-white/80" : "text-muted-foreground"}`}>
                  {online ? "Receiving order alerts" : "Tap to start earning"}
                </p>
              </div>
            </div>
            <Switch checked={online} onCheckedChange={setOnline} />
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-3">
        <Card className="p-3 text-center">
          <IndianRupee className="h-4 w-4 mx-auto text-primary" />
          <p className="font-display text-lg font-bold mt-1">₹{todayEarnings}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Today</p>
        </Card>
        <Card className="p-3 text-center">
          <Package className="h-4 w-4 mx-auto text-primary" />
          <p className="font-display text-lg font-bold mt-1">{todayOrders}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Orders</p>
        </Card>
        <Card className="p-3 text-center">
          <Battery className="h-4 w-4 mx-auto text-success" />
          <p className="font-display text-lg font-bold mt-1">78%</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Battery</p>
        </Card>
      </div>

      {/* Available orders */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Nearby orders</h3>
          <span className="text-xs text-primary font-semibold">{mockOrders.length} live</span>
        </div>

        <div className="space-y-3">
          {mockOrders.map((o) => (
            <Card key={o.id} className="p-4 hover:shadow-card transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">{o.id}</p>
                  <p className="font-semibold text-foreground">{o.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-primary">₹{o.payout}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end"><Clock className="h-3 w-3" /> {o.time}</p>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2 text-xs">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground"><span className="text-muted-foreground">Pickup:</span> {o.pickup}</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <MapPin className="h-3 w-3 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground"><span className="text-muted-foreground">Drop:</span> {o.drop}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Navigation className="h-3 w-3" /> {o.distance} km
                </span>
                <Button
                  size="sm"
                  onClick={() => accept(o.id)}
                  className="rounded-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Accept
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiderHome;
