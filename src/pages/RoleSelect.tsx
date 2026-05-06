import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PhoneShell } from "@/components/PhoneShell";
import { BharLogo } from "@/components/BharLogo";
import { Bike, Truck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RoleSelect = () => {
  const { user, profile, isAdmin, setActiveRole, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState<"rider" | "subscriber" | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/auth", { replace: true });
    else if (profile?.onboarding_complete) {
      navigate(isAdmin ? "/admin" : "/app", { replace: true });
    }
  }, [user, profile, isAdmin, loading, navigate]);

  const choose = async (r: "rider" | "subscriber") => {
    setBusy(r);
    try {
      await setActiveRole(r);
      toast.success(`Welcome, ${r}!`);
      navigate("/app", { replace: true });
    } catch (e: any) {
      toast.error(e.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  };

  return (
    <PhoneShell>
      <div className="flex flex-col h-full min-h-screen md:min-h-[820px] bg-background px-7 pt-10">
        <BharLogo size={44} withWord />
        <div className="mt-10">
          <h1 className="font-display text-3xl font-bold leading-tight">
            How will you<br /><span className="text-primary">use BHAR?</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">You can switch later from your profile.</p>
        </div>

        <div className="mt-10 space-y-4">
          <button
            disabled={!!busy}
            onClick={() => choose("subscriber")}
            className="w-full rounded-3xl border-2 border-border hover:border-primary p-5 text-left transition group"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow shrink-0">
                {busy === "subscriber" ? <Loader2 className="h-6 w-6 animate-spin" /> : <Bike className="h-7 w-7" />}
              </div>
              <div>
                <p className="font-display font-bold text-lg">I'm a Subscriber</p>
                <p className="text-sm text-muted-foreground mt-0.5">Subscribe to a BHAR EV, manage maintenance, track your bike.</p>
              </div>
            </div>
          </button>

          <button
            disabled={!!busy}
            onClick={() => choose("rider")}
            className="w-full rounded-3xl border-2 border-border hover:border-primary p-5 text-left transition group"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow shrink-0">
                {busy === "rider" ? <Loader2 className="h-6 w-6 animate-spin" /> : <Truck className="h-7 w-7" />}
              </div>
              <div>
                <p className="font-display font-bold text-lg">I'm a Rider</p>
                <p className="text-sm text-muted-foreground mt-0.5">Earn money making deliveries on a BHAR EV.</p>
              </div>
            </div>
          </button>
        </div>

        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="mt-6 text-sm font-semibold text-primary hover:underline self-center"
          >
            Continue to Admin Console →
          </button>
        )}
      </div>
    </PhoneShell>
  );
};

export default RoleSelect;
