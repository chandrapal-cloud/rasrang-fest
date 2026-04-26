import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import bikeSide from "@/assets/bhar-delivery-side.png";
import bikeFront from "@/assets/bhar-delivery-front.png";
import bikeAngle from "@/assets/bhar-delivery-angle.png";
import { PhoneShell } from "@/components/PhoneShell";
import { FloatingScene } from "@/components/FloatingScene";
import { BharLogo } from "@/components/BharLogo";

const slides = [
  {
    variant: "business" as const,
    image: bikeSide,
    title: "Manage Your Business",
    titleAccent: "on the Go",
    desc: "Real-time tracking, order management, and route optimization. All from your pocket.",
  },
  {
    variant: "delivery" as const,
    image: bikeFront,
    title: "Smart Delivery",
    titleAccent: "Starts Here",
    desc: "Fast, eco-friendly BharBike — built for India's busiest streets.",
  },
  {
    variant: "routing" as const,
    image: bikeAngle,
    title: "Smart Routing",
    titleAccent: "Beat the traffic",
    desc: "Maximize efficiency with real-time, AI-powered navigation that finds the fastest path.",
  },
];

const Onboarding = () => {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();
  const slide = slides[idx];
  const isLast = idx === slides.length - 1;

  const finish = () => {
    localStorage.setItem("bhar_onboarded", "1");
    navigate("/auth", { replace: true });
  };
  const next = () => (isLast ? finish() : setIdx(idx + 1));
  const goto = (i: number) => setIdx(i);

  return (
    <PhoneShell>
      <div className="relative flex flex-col min-h-screen md:min-h-[820px] bg-background overflow-hidden">
        {/* Logo + Skip */}
        <div className="relative z-30 flex items-center justify-between px-6 pt-6">
          <BharLogo size={40} withWord />
          <button
            onClick={finish}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition"
          >
            Skip
          </button>
        </div>

        {/* HERO — bike with floating animated scene */}
        <div className="relative flex-1 min-h-[340px] flex items-center justify-center">
          <FloatingScene key={`scene-${idx}`} variant={slide.variant} />

          <div className="relative z-10 w-full max-w-[420px] px-6">
            <img
              key={`bike-${idx}`}
              src={slide.image}
              alt={slide.title}
              className="mx-auto block w-full max-h-[300px] object-contain bike-float drop-shadow-[0_30px_30px_rgba(0,0,0,0.18)] animate-fade-in"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative z-20 px-7 pb-7 pt-2">
          <h1
            key={`t-${idx}`}
            className="font-display text-[28px] md:text-[32px] leading-[1.1] font-bold text-foreground text-center animate-fade-in tracking-tight"
          >
            {slide.title}
            <br />
            <span className="text-primary">{slide.titleAccent}</span>
          </h1>

          <p
            key={`d-${idx}`}
            className="mt-3 text-center text-[14px] leading-relaxed text-muted-foreground animate-fade-in max-w-[340px] mx-auto"
          >
            {slide.desc}
          </p>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goto(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === idx ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <Button
            size="lg"
            onClick={next}
            className="group mt-6 w-full rounded-full h-14 bg-primary text-primary-foreground font-bold text-base tracking-wide shadow-glow hover:opacity-95 hover:scale-[1.01] transition"
          >
            {isLast ? "GET STARTED" : "NEXT"}
            <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* bike float */}
        <style>{`
          @keyframes bike-float {
            0%, 100% { transform: translateY(0) rotate(-0.3deg); }
            50%      { transform: translateY(-8px) rotate(0.3deg); }
          }
          .bike-float { animation: bike-float 3.4s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .bike-float { animation: none; } }
        `}</style>
      </div>
    </PhoneShell>
  );
};

export default Onboarding;
