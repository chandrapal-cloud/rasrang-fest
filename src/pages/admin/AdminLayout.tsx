import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, LayoutDashboard, Users, Bike, CalendarCheck, Truck, CreditCard, LogOut, Bot } from "lucide-react";
import { BharLogo } from "@/components/BharLogo";
import { Button } from "@/components/ui/button";

const tabs = [
  { to: "/admin", end: true, icon: LayoutDashboard, label: "Overview" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/bikes", icon: Bike, label: "Bikes" },
  { to: "/admin/bookings", icon: CalendarCheck, label: "Bookings" },
  { to: "/admin/deliveries", icon: Truck, label: "Deliveries" },
  { to: "/admin/subscriptions", icon: CreditCard, label: "Subscriptions" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, profile, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/app" replace />;

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
        <div className="p-6 border-b border-border flex items-center gap-2">
          <BharLogo size={32} />
          <div>
            <p className="font-display font-bold text-sm">BHAR Admin</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Console</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs font-semibold truncate">{profile?.full_name || "Admin"}</p>
            <p className="text-[10px] text-muted-foreground">Administrator</p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={async () => { await signOut(); navigate("/auth"); }}>
            <LogOut className="h-3.5 w-3.5 mr-2" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2"><BharLogo size={28} /><span className="font-bold text-sm">Admin</span></div>
          <Button size="sm" variant="ghost" onClick={() => navigate("/app")}>App</Button>
        </div>
        <nav className="flex overflow-x-auto px-2 pb-2 gap-1 no-scrollbar">
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`
              }>
              <t.icon className="h-3.5 w-3.5" /> {t.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <main className="flex-1 md:p-8 p-4 pt-28 md:pt-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
