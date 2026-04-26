import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Package, Bike, Sparkles } from "lucide-react";
import bikeFront from "@/assets/bhar-bike-front.jpeg";
import bikeAngle from "@/assets/bhar-bike-angle.jpeg";
import bikeSide from "@/assets/bhar-bike-side.jpeg";
import { PhoneShell } from "@/components/PhoneShell";
import { MovingCity } from "@/components/MovingCity";

const slides = [
  {
    icon: Wallet,
    title: "Earn ₹40,000",
    titleAccent: "every month",
    subtitle: "Rider Income",
    desc: "Zero fuel cost. Daily payouts. Weekly bonuses. Join thousands of BHAR riders building real income on electric.",
    image: bikeAngle,
    tone: "dawn" as const,
    stats: [
      { k: "₹138", v: "avg/order" },
      { k: "4.9★", v: "rider rating" },
      { k: "0₹", v: "fuel cost" },
    ],
  },
  {
    icon: Package,
    title: "Deliver smarter,",
    titleAccent: "not harder",
    subtitle: "Delivery Module",
    desc: "Smart order routing, built-in navigation, scan-to-deliver, live earnings — every tool a pro rider needs in one app.",
    image: bikeFront,
    tone: "noon" as const,
    stats: [
      { k: "12k+", v: "active riders" },
      { k: "8 min", v: "avg delivery" },
      { k: "24/7", v: "support" },
    ],
  },
  {
    icon: Bike,
    title: "Your bike,",
    titleAccent: "fully managed",
    subtitle: "Bike Management",
    desc: "Subscription plans, live battery health, GPS tracker, geofence alerts and one-tap service bookings — all yours.",
    image: bikeSide,
    tone: "dusk" as const,
    stats: [
      { k: "80 km", v: "range" },
      { k: "2 min", v: "battery swap" },
      { k: "95%", v: "uptime" },
    ],
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
  const goto = (i: number) => setIdx(i);

  return (
    <PhoneShell>
      <div className="relative flex flex-col min-h-screen md:min-h-[820px] bg-background">
        {/* TOP HALF — animated city + bike */}
        <div className="relative h-[44vh] min-h-[300px] md:h-[440px] overflow-hidden flex-shrink-0">
          {/* Per-slide animated city as parallax background */}
          <MovingCity key={`city-${idx}`} tone={slide.tone} />

          {/* Soft vignette to ground the bike against the city */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,hsl(0_0%_0%/0.55),transparent_60%)] pointer-events-none" />

          {/* Top status bar */}
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 pt-5">
            <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                BHA<span className="text-primary">र</span> · {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
            <button
              onClick={finish}
              className="text-xs font-semibold text-white/70 hover:text-white transition"
            >
              Skip
            </button>
          </div>

          {/* Floating subtitle chip with sparkle */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 animate-fade-in" key={`chip-${idx}`}>
            <div className="flex items-center gap-2 rounded-full bg-gradient-primary px-3.5 py-1.5 shadow-glow">
              <Icon className="h-3.5 w-3.5 text-primary-foreground" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                {slide.subtitle}
              </span>
              <Sparkles className="h-3 w-3 text-primary-foreground/80" />
            </div>
          </div>

          {/* The bike — sits on the road, gently bobs */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
            <div className="relative w-full max-w-[420px]">
              {/* Ground glow under wheels */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-6 w-[78%] rounded-[100%] bg-primary/40 blur-2xl animate-pulse" />
              {/* The bike image */}
              <img
                key={`bike-${idx}`}
                src={slide.image}
                alt={slide.subtitle}
                className="relative z-10 mx-auto block w-[88%] max-h-[280px] object-contain bike-bob drop-shadow-[0_25px_25px_rgba(0,0,0,0.55)]"
              />
              {/* Speed streaks behind bike */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3">
                <div className="absolute top-[55%] left-2 h-0.5 w-16 bg-gradient-to-r from-transparent to-primary/80 streak-1" />
                <div className="absolute top-[65%] left-6 h-0.5 w-24 bg-gradient-to-r from-transparent to-primary-glow/80 streak-2" />
                <div className="absolute top-[72%] left-3 h-0.5 w-12 bg-gradient-to-r from-transparent to-primary/60 streak-3" />
                <div className="absolute top-[80%] left-8 h-0.5 w-20 bg-gradient-to-r from-transparent to-primary-glow/70 streak-1" />
              </div>
            </div>
          </div>

          {/* Bottom curved fade into content */}
          <div className="absolute -bottom-px left-0 right-0 h-20 bg-gradient-to-t from-background via-background/90 to-transparent" />
        </div>

        {/* BOTTOM — content */}
        <div className="relative -mt-6 flex-1 flex flex-col px-7 pt-2 pb-8">
          {/* Title */}
          <h1
            key={`t-${idx}`}
            className="font-display text-[34px] leading-[1.05] font-bold text-foreground animate-fade-in tracking-tight"
          >
            {slide.title}
            <br />
            <span className="text-gradient">{slide.titleAccent}</span>
          </h1>

          <p
            key={`d-${idx}`}
            className="mt-4 text-[15px] leading-relaxed text-muted-foreground animate-fade-in"
          >
            {slide.desc}
          </p>

          {/* Stat strip */}
          <div
            key={`s-${idx}`}
            className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-secondary/[0.04] border border-border p-3 animate-fade-in"
          >
            {slide.stats.map((s, i) => (
              <div
                key={s.k}
                className={`text-center ${i !== 0 ? "border-l border-border" : ""}`}
              >
                <p className="font-display text-base font-bold text-foreground">{s.k}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                  {s.v}
                </p>
              </div>
            ))}
          </div>

          {/* Footer: dots + CTA */}
          <div className="mt-auto flex items-center justify-between pt-7">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goto(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === idx ? "w-9 bg-gradient-primary shadow-glow" : "w-2 bg-border hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <Button
              size="lg"
              onClick={next}
              className="group rounded-full h-14 px-7 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95 hover:scale-[1.02] transition"
            >
              {idx === slides.length - 1 ? "Get Started" : "Next"}
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Local animations */}
        <style>{`
          @keyframes bike-bob {
            0%, 100% { transform: translateY(0) rotate(-0.4deg); }
            50%      { transform: translateY(-6px) rotate(0.4deg); }
          }
          .bike-bob { animation: bike-bob 1.6s ease-in-out infinite; }

          @keyframes streak-fade {
            0%   { transform: translateX(-30px); opacity: 0; }
            40%  { opacity: 1; }
            100% { transform: translateX(60px); opacity: 0; }
          }
          .streak-1 { animation: streak-fade 1.1s linear infinite; }
          .streak-2 { animation: streak-fade 0.9s linear infinite 0.2s; }
          .streak-3 { animation: streak-fade 1.3s linear infinite 0.5s; }
        `}</style>
      </div>
    </PhoneShell>
  );
};

export default Onboarding;
