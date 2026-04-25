import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/bhar-logo.jpeg";
import { Zap } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      const seen = localStorage.getItem("bhar_onboarded");
      navigate(seen ? "/auth" : "/onboarding", { replace: true });
    }, 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="phone-shell bg-gradient-hero text-secondary-foreground flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-logo-pulse" />
        <div className="absolute h-40 w-40 rounded-full border border-primary/40 animate-ping-slow" />
        <div className="absolute h-40 w-40 rounded-full border border-primary/30 animate-ping-slow" style={{ animationDelay: "0.6s" }} />
      </div>

      {/* Sparks */}
      {[0, 1, 2, 3].map((i) => (
        <Zap
          key={i}
          className="absolute h-4 w-4 text-primary-glow animate-spark"
          style={{
            top: `${30 + i * 8}%`,
            left: `${20 + (i % 2) * 50}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-6 animate-scale-in">
        <div className="rounded-3xl bg-white p-5 shadow-glow animate-logo-pulse">
          <img src={logo} alt="BHAR EV" className="h-20 w-20 object-contain" />
        </div>
        <div className="text-center">
          <h1 className="font-display text-5xl font-bold tracking-tight">
            BHA<span className="text-primary">र</span>
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/60">Electric • Earn • Deliver</p>
        </div>
      </div>

      <div className="absolute bottom-12 flex items-center gap-2 text-xs text-white/50">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        Powering up...
      </div>
    </div>
  );
};

export default Splash;
