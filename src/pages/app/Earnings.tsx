import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { TrendingUp, Package, Clock, Award } from "lucide-react";

const week = [
  { day: "Mon", amount: 980 },
  { day: "Tue", amount: 1240 },
  { day: "Wed", amount: 760 },
  { day: "Thu", amount: 1420 },
  { day: "Fri", amount: 1680 },
  { day: "Sat", amount: 1860 },
  { day: "Sun", amount: 1240 },
];
const max = Math.max(...week.map((w) => w.amount));

const Earnings = () => {
  const total = week.reduce((s, w) => s + w.amount, 0);

  return (
    <div className="pb-6">
      <PageHeader title="Earnings" subtitle="Your income & insights" />

      <div className="px-5 -mt-6">
        <Card className="bg-gradient-primary text-primary-foreground p-5 border-0 shadow-glow">
          <p className="text-xs uppercase tracking-wider opacity-80">This week</p>
          <p className="font-display text-4xl font-bold mt-1">₹{total.toLocaleString()}</p>
          <div className="mt-2 flex items-center gap-1 text-xs">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+18% vs last week</span>
          </div>
        </Card>
      </div>

      {/* Bar chart */}
      <div className="px-5 mt-5">
        <Card className="p-5">
          <div className="flex items-end justify-between gap-2 h-32">
            {week.map((w) => (
              <div key={w.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-full">
                  <div
                    className="w-full rounded-t-md bg-gradient-primary shadow-soft"
                    style={{ height: `${(w.amount / max) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">{w.day}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <Package className="h-4 w-4 text-primary" />
          <p className="font-display text-xl font-bold mt-1">68</p>
          <p className="text-[11px] text-muted-foreground">Deliveries this week</p>
        </Card>
        <Card className="p-4">
          <Clock className="h-4 w-4 text-primary" />
          <p className="font-display text-xl font-bold mt-1">42h</p>
          <p className="text-[11px] text-muted-foreground">Online hours</p>
        </Card>
        <Card className="p-4">
          <TrendingUp className="h-4 w-4 text-success" />
          <p className="font-display text-xl font-bold mt-1">₹138</p>
          <p className="text-[11px] text-muted-foreground">Avg per order</p>
        </Card>
        <Card className="p-4">
          <Award className="h-4 w-4 text-warning" />
          <p className="font-display text-xl font-bold mt-1">4.9 ★</p>
          <p className="text-[11px] text-muted-foreground">Customer rating</p>
        </Card>
      </div>

      {/* Payout */}
      <div className="px-5 mt-6">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Next payout</p>
            <p className="font-semibold">Tomorrow, 9:00 AM</p>
          </div>
          <p className="font-display text-lg font-bold text-primary">₹9,180</p>
        </Card>
      </div>
    </div>
  );
};

export default Earnings;
