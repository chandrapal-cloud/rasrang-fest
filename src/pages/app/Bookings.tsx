import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";

const bookings = [
  { id: "BK-1201", type: "Battery Swap", date: "Today, 4:30 PM", location: "BHAR Hub Saket", status: "confirmed" },
  { id: "BK-1198", type: "General Service", date: "28 Apr, 11:00 AM", location: "BHAR Hub Lajpat", status: "pending" },
  { id: "BK-1190", type: "Tyre Replacement", date: "20 Apr, 2:00 PM", location: "BHAR Hub Saket", status: "completed" },
];

const statusStyles: Record<string, string> = {
  confirmed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  completed: "bg-muted text-muted-foreground",
};

const Bookings = () => (
  <div className="pb-6">
    <PageHeader title="Bookings" subtitle="Manage your service appointments" />
    <div className="px-5 -mt-4">
      <Button className="w-full h-13 py-3 rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
        <Plus className="h-4 w-4 mr-2" /> New Booking
      </Button>
    </div>

    <div className="px-5 mt-6 space-y-3">
      {bookings.map((b) => (
        <Card key={b.id} className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[11px] text-muted-foreground">{b.id}</p>
              <p className="font-semibold text-foreground">{b.type}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[b.status]}`}>
              {b.status}
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {b.date}</div>
            <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {b.location}</div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default Bookings;
