import { useAuth } from "@/contexts/AuthContext";
import { Bell, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bike, Truck, Check } from "lucide-react";
import { toast } from "sonner";

export const AppHeader = ({ subtitle }: { subtitle?: string }) => {
  const { profile, setActiveRole } = useAuth();
  const [open, setOpen] = useState(false);
  const role = profile?.active_role ?? "subscriber";
  const name = profile?.full_name?.split(" ")[0] || "Rider";

  const switchRole = async (r: "rider" | "subscriber") => {
    if (r === role) return setOpen(false);
    await setActiveRole(r);
    toast.success(`Switched to ${r === "rider" ? "Rider" : "Subscriber"} mode`);
    setOpen(false);
  };

  return (
    <header className="bg-gradient-hero text-secondary-foreground rounded-b-[2rem] px-6 pt-12 pb-6">
      <div className="flex items-center justify-between">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/15 transition">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold">
                {role === "rider" ? "R" : "S"}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                {role === "rider" ? "Rider" : "Subscriber"}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <SheetHeader>
              <SheetTitle>Switch mode</SheetTitle>
            </SheetHeader>
            <div className="grid gap-3 py-4">
              <button
                onClick={() => switchRole("subscriber")}
                className="flex items-center gap-4 rounded-2xl border border-border p-4 text-left hover:bg-muted transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <Bike className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Subscriber</p>
                  <p className="text-xs text-muted-foreground">Manage subscription, GPS, battery & service</p>
                </div>
                {role === "subscriber" && <Check className="h-5 w-5 text-primary" />}
              </button>
              <button
                onClick={() => switchRole("rider")}
                className="flex items-center gap-4 rounded-2xl border border-border p-4 text-left hover:bg-muted transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <Truck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Rider</p>
                  <p className="text-xs text-muted-foreground">Accept deliveries, track earnings</p>
                </div>
                {role === "rider" && <Check className="h-5 w-5 text-primary" />}
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/app/profile" className="relative">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/15">
            <Bell className="h-5 w-5" />
          </button>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
        </Link>
      </div>

      <div className="mt-5">
        <p className="text-sm text-white/60">Namaste,</p>
        <h1 className="font-display text-2xl font-bold">{name} 👋</h1>
        {subtitle && <p className="mt-1 text-sm text-white/70">{subtitle}</p>}
      </div>
    </header>
  );
};
