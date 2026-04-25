import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock, Package, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Status = "available" | "ongoing" | "completed";

interface Delivery {
  id: string;
  customer: string;
  pickup: string;
  drop: string;
  distance: number;
  payout: number;
  time: string;
  status: Status;
}

const initial: Delivery[] = [
  { id: "ORD-2841", customer: "Priya S.", pickup: "BHAR Hub Saket", drop: "GK-II Block M", distance: 4.2, payout: 85, time: "12m", status: "ongoing" },
  { id: "ORD-2842", customer: "Amit K.", pickup: "Lajpat Nagar", drop: "Defence Colony", distance: 2.8, payout: 60, time: "8m", status: "available" },
  { id: "ORD-2843", customer: "Neha M.", pickup: "Hauz Khas", drop: "Vasant Vihar", distance: 5.1, payout: 95, time: "15m", status: "available" },
  { id: "ORD-2820", customer: "Ravi P.", pickup: "Nehru Place", drop: "CR Park", distance: 3.4, payout: 70, time: "10m", status: "completed" },
];

const tabs: { key: Status; label: string }[] = [
  { key: "available", label: "Available" },
  { key: "ongoing", label: "Ongoing" },
  { key: "completed", label: "Completed" },
];

const Deliveries = () => {
  const [tab, setTab] = useState<Status>("available");
  const [list, setList] = useState(initial);
  const filtered = list.filter((d) => d.status === tab);

  const accept = (id: string) => {
    setList((prev) => prev.map((d) => (d.id === id ? { ...d, status: "ongoing" } : d)));
    setTab("ongoing");
    toast.success("Order accepted. Navigate to pickup.");
  };
  const complete = (id: string) => {
    setList((prev) => prev.map((d) => (d.id === id ? { ...d, status: "completed" } : d)));
    toast.success("Delivery completed! ₹ added to earnings.");
  };

  return (
    <div className="pb-6">
      <PageHeader title="Deliveries" subtitle="Manage your delivery jobs" />

      <div className="px-5 mt-4">
        <div className="flex gap-2 rounded-2xl bg-muted p-1.5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition ${
                tab === t.key ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {filtered.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No {tab} deliveries</p>
          </Card>
        )}
        {filtered.map((d) => (
          <Card key={d.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] text-muted-foreground">{d.id}</p>
                <p className="font-semibold">{d.customer}</p>
              </div>
              <p className="font-display text-xl font-bold text-primary">₹{d.payout}</p>
            </div>
            <div className="space-y-1.5 text-xs mb-3">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span>{d.pickup}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-3 w-3 text-success mt-0.5 shrink-0" />
                <span>{d.drop}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Navigation className="h-3 w-3" /> {d.distance} km</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {d.time}</span>
            </div>
            {d.status === "available" && (
              <Button onClick={() => accept(d.id)} className="w-full rounded-full bg-gradient-primary text-primary-foreground">
                Accept Order
              </Button>
            )}
            {d.status === "ongoing" && (
              <Button onClick={() => complete(d.id)} className="w-full rounded-full bg-success text-success-foreground hover:opacity-90">
                <CheckCircle2 className="h-4 w-4 mr-1" /> Mark Delivered
              </Button>
            )}
            {d.status === "completed" && (
              <div className="text-center text-xs font-semibold text-success">✓ Delivered</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Deliveries;
