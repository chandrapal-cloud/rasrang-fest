import { Link, useLocation } from "react-router-dom";
import { Home, Package, Wrench, MapPin, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const subscriberTabs = [
  { to: "/app", icon: Home, label: "Home" },
  { to: "/app/bookings", icon: Package, label: "Bookings" },
  { to: "/app/maintenance", icon: Wrench, label: "Service" },
  { to: "/app/tracker", icon: MapPin, label: "Tracker" },
  { to: "/app/profile", icon: User, label: "Profile" },
];

const riderTabs = [
  { to: "/app", icon: Home, label: "Home" },
  { to: "/app/deliveries", icon: Package, label: "Orders" },
  { to: "/app/earnings", icon: Wrench, label: "Earnings" },
  { to: "/app/tracker", icon: MapPin, label: "Bike" },
  { to: "/app/profile", icon: User, label: "Profile" },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  const { profile } = useAuth();
  const tabs = profile?.active_role === "rider" ? riderTabs : subscriberTabs;

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="grid grid-cols-5 px-2 pt-2 pb-3">
        {tabs.map(({ to, icon: Icon, label }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-1 py-1.5 transition-colors"
            >
              <div
                className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                  active ? "bg-gradient-primary shadow-glow" : ""
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    active ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
