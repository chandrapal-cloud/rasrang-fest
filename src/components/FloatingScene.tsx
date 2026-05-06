import { MapPin, Package, Share2, Gauge, Leaf, Zap } from "lucide-react";
import { Draggable } from "./Draggable";

type Variant = "business" | "delivery" | "routing";

interface Props {
  variant: Variant;
}

/**
 * FloatingScene — light, airy background with animated decorative
 * elements (packages, pins, route lines) that float around the bike.
 * Each variant tells a different story.
 */
export const FloatingScene = ({ variant }: Props) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Soft warm gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--primary) / 0.08), hsl(var(--background)) 60%, hsl(var(--background)))",
        }}
      />

      {/* Subtle radial glow behind bike */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full bg-primary/15 blur-3xl" />

      {/* Tile floor */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      {variant === "business" && <BusinessElements />}
      {variant === "delivery" && <DeliveryElements />}
      {variant === "routing" && <RoutingElements />}

      {/* Animations */}
      <style>{`
        @keyframes float-a { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-14px) rotate(4deg); } }
        @keyframes float-b { 0%,100% { transform: translateY(0) rotate(6deg); }  50% { transform: translateY(-10px) rotate(-3deg); } }
        @keyframes float-c { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-18px) rotate(3deg); } }
        @keyframes pin-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes dash-flow { to { stroke-dashoffset: -40; } }
        @keyframes wind-puff { 0% { transform: translateX(0); opacity: 0; } 30% { opacity: 0.7; } 100% { transform: translateX(-80px); opacity: 0; } }
        @keyframes pulse-ring { 0% { transform: scale(0.6); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes spin-slow { to { transform: rotate(360deg); } }

        .float-a { animation: float-a 4.2s ease-in-out infinite; }
        .float-b { animation: float-b 3.6s ease-in-out infinite; }
        .float-c { animation: float-c 5s   ease-in-out infinite; }
        .pin-bounce { animation: pin-bounce 2.4s ease-in-out infinite; }
        .dash-flow { stroke-dasharray: 6 6; animation: dash-flow 1.2s linear infinite; }
        .wind-puff { animation: wind-puff 2.4s ease-out infinite; }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        .spin-slow { animation: spin-slow 8s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .float-a, .float-b, .float-c, .pin-bounce, .dash-flow, .wind-puff, .pulse-ring, .spin-slow { animation: none; }
        }
      `}</style>
    </div>
  );
};

/* ───────────────── Variant 1: Business — packages + connection nodes ───────────────── */
const BusinessElements = () => (
  <>
    {/* Floating packages */}
    <div className="absolute top-[18%] left-[10%] float-a">
      <PackageBox size={44} />
    </div>
    <div className="absolute top-[12%] right-[18%] float-b">
      <PackageBox size={36} />
    </div>
    <div className="absolute top-[55%] left-[6%] float-c">
      <PackageBox size={32} />
    </div>
    <div className="absolute top-[50%] right-[8%] float-a">
      <PackageBox size={38} />
    </div>

    {/* Network nodes */}
    <div className="absolute top-[20%] right-[6%] float-c">
      <div className="relative h-14 w-14">
        <Share2 className="absolute inset-0 m-auto h-8 w-8 text-primary/70" />
        <div className="absolute inset-0 rounded-full border border-primary/40 pulse-ring" />
      </div>
    </div>

    {/* Wind streaks */}
    <Wind />
  </>
);

/* ───────────────── Variant 2: Delivery — pins + connection web ───────────────── */
const DeliveryElements = () => (
  <>
    {/* Connecting web — SVG */}
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 500" preserveAspectRatio="none">
      <g stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none" opacity="0.55">
        <path d="M40,120 Q200,180 360,110" className="dash-flow" />
        <path d="M30,360 Q200,260 380,360" className="dash-flow" style={{ animationDelay: "0.4s" }} />
        <path d="M60,80 Q150,250 70,420" className="dash-flow" style={{ animationDelay: "0.2s" }} />
        <path d="M340,90 Q260,260 350,430" className="dash-flow" style={{ animationDelay: "0.6s" }} />
      </g>
    </svg>

    {/* Location pins at the nodes */}
    <Pin className="top-[18%] left-[8%]" delay="0s" />
    <Pin className="top-[16%] right-[12%]" delay="0.3s" />
    <Pin className="top-[68%] left-[10%]" delay="0.6s" />
    <Pin className="top-[70%] right-[8%]" delay="0.9s" />
    <Pin className="top-[42%] left-[4%]" delay="1.2s" small />
    <Pin className="top-[44%] right-[4%]" delay="0.5s" small />

    {/* Speed badges */}
    <div className="absolute top-[28%] left-[6%] float-a">
      <Badge icon={<Zap className="h-3 w-3" />} label="Fast" />
    </div>
    <div className="absolute top-[28%] right-[6%] float-b">
      <Badge icon={<Leaf className="h-3 w-3" />} label="Eco" />
    </div>
  </>
);

/* ───────────────── Variant 3: Routing — route map with packages ───────────────── */
const RoutingElements = () => (
  <>
    {/* Route map underneath */}
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 500" preserveAspectRatio="none">
      <g stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.4">
        <polyline
          points="50,420 100,320 180,360 240,260 320,300 360,200"
          className="dash-flow"
        />
        <polyline
          points="40,440 90,440 90,380 200,380 200,300 340,300"
          className="dash-flow"
          style={{ animationDelay: "0.5s" }}
        />
      </g>
    </svg>

    {/* Pins along route */}
    <Pin className="top-[80%] left-[10%]" delay="0s" />
    <Pin className="top-[55%] left-[42%]" delay="0.3s" small />
    <Pin className="top-[35%] right-[12%]" delay="0.6s" />
    <Pin className="top-[68%] right-[20%]" delay="0.9s" small />

    {/* Floating packages */}
    <div className="absolute top-[14%] left-[12%] float-a">
      <PackageBox size={40} />
    </div>
    <div className="absolute top-[10%] right-[16%] float-b">
      <PackageBox size={36} />
    </div>
    <div className="absolute top-[58%] right-[6%] float-c">
      <PackageBox size={32} />
    </div>

    {/* Compass / target */}
    <div className="absolute top-[20%] right-[8%]">
      <div className="relative h-12 w-12 rounded-full border-2 border-primary/40 spin-slow flex items-center justify-center">
        <div className="h-1 w-1 rounded-full bg-primary" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 h-2 w-0.5 bg-primary" />
      </div>
    </div>
  </>
);

/* ───────────────── small helpers ───────────────── */
const PackageBox = ({ size = 40 }: { size?: number }) => (
  <div
    className="rounded-md shadow-md flex items-center justify-center"
    style={{
      width: size,
      height: size,
      background: "linear-gradient(135deg, hsl(38 70% 78%), hsl(32 75% 60%))",
      border: "1px solid hsl(28 60% 40% / 0.5)",
    }}
  >
    <Package
      style={{ width: size * 0.45, height: size * 0.45, color: "hsl(28 60% 25%)" }}
    />
  </div>
);

const Pin = ({
  className = "",
  delay = "0s",
  small = false,
}: {
  className?: string;
  delay?: string;
  small?: boolean;
}) => (
  <div className={`absolute pin-bounce ${className}`} style={{ animationDelay: delay }}>
    <div className="relative">
      <MapPin
        className={`text-primary drop-shadow-md ${small ? "h-5 w-5" : "h-7 w-7"}`}
        fill="hsl(var(--primary) / 0.25)"
        strokeWidth={2.5}
      />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-3 rounded-full bg-primary/30 blur-sm" />
    </div>
  </div>
);

const Badge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md border border-primary/20">
    <span className="text-primary">{icon}</span>
    <span className="text-[10px] font-bold text-foreground">{label}</span>
  </div>
);

const Wind = () => (
  <div className="absolute bottom-[18%] left-0 w-1/2 h-12 pointer-events-none">
    <div className="absolute top-2  left-20 h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-muted-foreground/40 to-muted-foreground/60 wind-puff" />
    <div className="absolute top-5  left-24 h-0.5 w-12 rounded-full bg-gradient-to-r from-transparent via-muted-foreground/30 to-muted-foreground/50 wind-puff" style={{ animationDelay: "0.4s" }} />
    <div className="absolute top-8  left-16 h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-muted-foreground/40 to-muted-foreground/60 wind-puff" style={{ animationDelay: "0.8s" }} />
    <div className="absolute top-11 left-28 h-0.5 w-10 rounded-full bg-gradient-to-r from-transparent via-muted-foreground/30 to-muted-foreground/50 wind-puff" style={{ animationDelay: "1.1s" }} />
  </div>
);
