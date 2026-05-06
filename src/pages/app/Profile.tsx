import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Bike, Truck, ChevronRight, FileText, HelpCircle, Shield, Bell, Wallet, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { profile, signOut, setActiveRole, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth", { replace: true });
  };

  const switchRole = async (r: "rider" | "subscriber") => {
    await setActiveRole(r);
    toast.success(`Switched to ${r} mode`);
  };

  const role = profile?.active_role ?? "subscriber";

  return (
    <div className="pb-6">
      <PageHeader title="Profile" />

      {/* User card */}
      <div className="px-5 -mt-6">
        <Card className="p-5 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground font-display text-2xl font-bold shadow-glow">
            {profile?.full_name?.[0]?.toUpperCase() || "B"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-lg truncate">{profile?.full_name || "BHAR User"}</p>
            <p className="text-xs text-muted-foreground truncate">{profile?.phone || "Add phone number"}</p>
            <span className="inline-block mt-1.5 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-bold uppercase">
              {role} mode
            </span>
          </div>
        </Card>
      </div>

      {/* Mode switcher */}
      <div className="px-5 mt-5">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">App mode</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => switchRole("subscriber")}
            className={`rounded-2xl p-4 text-left border-2 transition ${
              role === "subscriber" ? "border-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            <Bike className="h-6 w-6 text-primary mb-2" />
            <p className="font-bold text-sm">Subscriber</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Manage your bike</p>
          </button>
          <button
            onClick={() => switchRole("rider")}
            className={`rounded-2xl p-4 text-left border-2 transition ${
              role === "rider" ? "border-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            <Truck className="h-6 w-6 text-primary mb-2" />
            <p className="font-bold text-sm">Rider</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Earn with deliveries</p>
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 mt-5">
        <Card className="divide-y divide-border">
          {[
            { icon: Wallet, label: "Payment methods" },
            { icon: FileText, label: "Documents & KYC" },
            { icon: Bell, label: "Notifications" },
            { icon: Shield, label: "Privacy & security" },
            { icon: HelpCircle, label: "Help & support" },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition text-left">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-4 w-4" />
              </div>
              <span className="flex-1 text-sm font-medium">{label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </Card>
      </div>

      <div className="px-5 mt-5">
        <Button variant="outline" onClick={handleSignOut} className="w-full h-12 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5">
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
        <p className="text-center text-[11px] text-muted-foreground mt-4">
          BHAR EV · v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Profile;
