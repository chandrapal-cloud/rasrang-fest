import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Package, Bike } from "lucide-react";
import bikeFront from "@/assets/bhar-bike-front.jpeg";
import bikeAngle from "@/assets/bhar-bike-angle.jpeg";
import bikeSide from "@/assets/bhar-bike-side.jpeg";
import { PhoneShell } from "@/components/PhoneShell";

const slides = [
  {
    icon: Wallet,
    title: "Earn ₹40,000+ monthly",
    subtitle: "Rider Income",
    desc: "Join thousands of BHAR riders earning serious money with zero fuel cost. Daily payouts, transparent fares, weekly bonuses.",
    image: bikeAngle,
    accent: "from-primary to-primary-glow",
  },
  {
    icon: Package,
    title: "Deliver smarter, not harder",
    subtitle: "Delivery Module",
    desc: "Accept orders nearby, navigate with built-in GPS, scan-to-deliver, and track your earnings live — all in one app.",
    image: bikeFront,
    accent: "from-primary-glow to-primary",
  },
  {
    icon: Bike,
    title: "Your bike, fully managed",
    subtitle: "Bike Management",
    desc: "Subscription plans, battery health, GPS tracker, and one-tap service bookings — your BHAR EV taken care of.",
    image: bikeSide,
    accent: "from-primary to-warning",
  },
];

const Onboarding = () => {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();
  const slide = slides[idx];
  const Icon = slide.icon;

  const finish = () => {
    localStorage.setItem("bhar_onboarded", "1");
    navigate("/auth", { replace: true });
  };

  const next = () => (idx === slides.length - 1 ? finish() : setIdx(idx + 1));

  return (
    <PhoneShell>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-[820px]">
        {/* Skip */}
        <button
          onClick={finish}
          className="absolute right-5 top-5 z-20 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Skip
        </button>

        {/* Image area */}
        <div className="relative h-[58%] bg-gradient-hero overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.35),transparent_60%)]" />
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.title}
            className="relative z-10 max-h-[78%] w-auto object-contain animate-scale-in drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col px-7 pt-2 pb-8">
          <div
            key={idx}
            className={`mb-3 inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r ${slide.accent} px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground animate-fade-in`}
          >
            <Icon className="h-3.5 w-3.5" />
            {slide.subtitle}
          </div>

          <h1 key={`t-${idx}`} className="font-display text-3xl font-bold leading-tight text-foreground animate-fade-in">
            {slide.title}
          </h1>
          <p key={`d-${idx}`} className="mt-3 text-[15px] leading-relaxed text-muted-foreground animate-fade-in">
            {slide.desc}
          </p>

          <div className="mt-auto flex items-center justify-between pt-8">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === idx ? "w-8 bg-primary" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <Button
              size="lg"
              onClick={next}
              className="rounded-full h-14 px-7 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
            >
              {idx === slides.length - 1 ? "Get Started" : "Next"}
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
};

export default Onboarding;
