/**
 * MovingCity — animated SVG scene that gives the illusion of a bike riding through
 * a city. Uses pure CSS keyframes (no JS animation loop) for buttery smooth scroll.
 *
 * Layers (back → front):
 *  1. Sun + sky gradient (static)
 *  2. Far skyline (slow scroll)
 *  3. Mid skyline (medium scroll)
 *  4. Clouds (slow drift)
 *  5. Road + dashes (fast scroll)
 *  6. Motion speed lines (fast)
 */
import { useId } from "react";

interface Props {
  /** Color theme variant */
  tone?: "dawn" | "noon" | "dusk";
  className?: string;
}

const tones = {
  dawn: {
    skyTop: "hsl(18 70% 18%)",
    skyMid: "hsl(24 80% 35%)",
    skyBottom: "hsl(30 90% 60%)",
    sun: "hsl(40 100% 70%)",
    farBuilding: "hsl(0 0% 12%)",
    midBuilding: "hsl(0 0% 6%)",
    road: "hsl(0 0% 4%)",
  },
  noon: {
    skyTop: "hsl(0 0% 8%)",
    skyMid: "hsl(18 60% 22%)",
    skyBottom: "hsl(24 90% 55%)",
    sun: "hsl(24 100% 64%)",
    farBuilding: "hsl(0 0% 10%)",
    midBuilding: "hsl(0 0% 4%)",
    road: "hsl(0 0% 3%)",
  },
  dusk: {
    skyTop: "hsl(260 40% 14%)",
    skyMid: "hsl(18 70% 28%)",
    skyBottom: "hsl(18 95% 54%)",
    sun: "hsl(18 95% 60%)",
    farBuilding: "hsl(0 0% 8%)",
    midBuilding: "hsl(0 0% 3%)",
    road: "hsl(0 0% 2%)",
  },
};

export const MovingCity = ({ tone = "noon", className = "" }: Props) => {
  const id = useId().replace(/:/g, "");
  const t = tones[tone];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.skyTop} />
            <stop offset="55%" stopColor={t.skyMid} />
            <stop offset="100%" stopColor={t.skyBottom} />
          </linearGradient>
          {/* Sun radial */}
          <radialGradient id={`sun-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={t.sun} stopOpacity="1" />
            <stop offset="60%" stopColor={t.sun} stopOpacity="0.3" />
            <stop offset="100%" stopColor={t.sun} stopOpacity="0" />
          </radialGradient>
          {/* Road perspective */}
          <linearGradient id={`road-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.road} stopOpacity="0.4" />
            <stop offset="100%" stopColor={t.road} stopOpacity="1" />
          </linearGradient>

          {/* Reusable far skyline tile (width 800) */}
          <symbol id={`far-${id}`} viewBox="0 0 800 200" width="800" height="200">
            {/* Repeating thin towers */}
            {Array.from({ length: 26 }).map((_, i) => {
              const x = i * 32;
              const h = 60 + ((i * 37) % 110);
              return <rect key={i} x={x} y={200 - h} width="22" height={h} fill={t.farBuilding} />;
            })}
            {/* Window dots */}
            {Array.from({ length: 26 }).map((_, i) => {
              const x = i * 32 + 6;
              const h = 60 + ((i * 37) % 110);
              return Array.from({ length: Math.floor(h / 18) }).map((_, j) => (
                <rect
                  key={`w-${i}-${j}`}
                  x={x + (j % 2) * 8}
                  y={200 - h + 8 + j * 14}
                  width="3"
                  height="3"
                  fill="hsl(40 90% 60%)"
                  opacity={(i + j) % 4 === 0 ? 0.9 : 0.35}
                />
              ));
            })}
          </symbol>

          {/* Reusable mid skyline tile */}
          <symbol id={`mid-${id}`} viewBox="0 0 800 220" width="800" height="220">
            {Array.from({ length: 12 }).map((_, i) => {
              const x = i * 70;
              const h = 90 + ((i * 53) % 130);
              const w = 56;
              return (
                <g key={i}>
                  <rect x={x} y={220 - h} width={w} height={h} fill={t.midBuilding} />
                  {/* roof accent */}
                  <rect x={x + 8} y={220 - h - 6} width={w - 16} height={6} fill={t.midBuilding} />
                  {/* windows grid */}
                  {Array.from({ length: Math.floor(h / 16) }).map((_, r) =>
                    Array.from({ length: 4 }).map((_, c) => (
                      <rect
                        key={`mw-${i}-${r}-${c}`}
                        x={x + 8 + c * 11}
                        y={220 - h + 10 + r * 14}
                        width="6"
                        height="5"
                        fill="hsl(24 95% 60%)"
                        opacity={((i + r + c) * 7) % 5 === 0 ? 0.95 : 0.4}
                      />
                    ))
                  )}
                </g>
              );
            })}
          </symbol>

          {/* Cloud */}
          <symbol id={`cloud-${id}`} viewBox="0 0 200 60" width="200" height="60">
            <g fill="hsl(0 0% 100%)" opacity="0.08">
              <ellipse cx="40" cy="38" rx="36" ry="18" />
              <ellipse cx="80" cy="32" rx="46" ry="22" />
              <ellipse cx="130" cy="38" rx="40" ry="18" />
              <ellipse cx="170" cy="42" rx="28" ry="14" />
            </g>
          </symbol>
        </defs>

        {/* Sky */}
        <rect width="800" height="600" fill={`url(#sky-${id})`} />

        {/* Sun */}
        <circle cx="600" cy="200" r="180" fill={`url(#sun-${id})`} />
        <circle cx="600" cy="200" r="56" fill={t.sun} opacity="0.85" />

        {/* Stars (only visible against dark sky top) */}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={`s-${i}`}
            cx={(i * 47) % 800}
            cy={(i * 23) % 140}
            r={i % 4 === 0 ? 1.4 : 0.8}
            fill="white"
            opacity={0.5 + ((i % 3) * 0.15)}
          />
        ))}

        {/* Clouds — slow drift */}
        <g className="city-clouds">
          <use href={`#cloud-${id}`} x="0" y="80" />
          <use href={`#cloud-${id}`} x="320" y="50" />
          <use href={`#cloud-${id}`} x="600" y="100" />
          <use href={`#cloud-${id}`} x="800" y="80" />
          <use href={`#cloud-${id}`} x="1120" y="50" />
          <use href={`#cloud-${id}`} x="1400" y="100" />
        </g>

        {/* Far skyline — slow scroll */}
        <g className="city-far">
          <use href={`#far-${id}`} x="0" y="280" />
          <use href={`#far-${id}`} x="800" y="280" />
        </g>

        {/* Mid skyline — medium scroll */}
        <g className="city-mid">
          <use href={`#mid-${id}`} x="0" y="340" />
          <use href={`#mid-${id}`} x="800" y="340" />
        </g>

        {/* Ground / road */}
        <rect x="0" y="540" width="800" height="60" fill={`url(#road-${id})`} />
        {/* Road edge accent line */}
        <rect x="0" y="540" width="800" height="2" fill="hsl(18 95% 54%)" opacity="0.6" />

        {/* Road dashes — fast scroll */}
        <g className="city-road">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={`d-${i}`} x={i * 140} y="572" width="70" height="5" rx="2" fill="hsl(40 90% 60%)" opacity="0.85" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={`d2-${i}`} x={i * 140 + 800} y="572" width="70" height="5" rx="2" fill="hsl(40 90% 60%)" opacity="0.85" />
          ))}
        </g>

        {/* Motion lines (speed) */}
        <g className="city-speed" opacity="0.55">
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={`l-${i}`}
              x={(i * 90) % 800}
              y={420 + (i * 17) % 110}
              width={40 + (i % 3) * 30}
              height="1.5"
              fill="hsl(18 95% 64%)"
              opacity={0.5 + (i % 3) * 0.15}
            />
          ))}
        </g>
      </svg>

      {/* Animations scoped to this component */}
      <style>{`
        @keyframes city-scroll-far { from { transform: translateX(0); } to { transform: translateX(-800px); } }
        @keyframes city-scroll-mid { from { transform: translateX(0); } to { transform: translateX(-800px); } }
        @keyframes city-scroll-road { from { transform: translateX(0); } to { transform: translateX(-800px); } }
        @keyframes city-clouds-drift { from { transform: translateX(0); } to { transform: translateX(-800px); } }
        @keyframes city-speed-blur { 0%,100% { transform: translateX(0); opacity: 0.4; } 50% { transform: translateX(-30px); opacity: 0.8; } }

        .city-far    { animation: city-scroll-far  18s linear infinite; will-change: transform; }
        .city-mid    { animation: city-scroll-mid  10s linear infinite; will-change: transform; }
        .city-road   { animation: city-scroll-road  1.6s linear infinite; will-change: transform; }
        .city-clouds { animation: city-clouds-drift 32s linear infinite; will-change: transform; }
        .city-speed  { animation: city-speed-blur 0.6s ease-in-out infinite; will-change: transform, opacity; }

        @media (prefers-reduced-motion: reduce) {
          .city-far, .city-mid, .city-road, .city-clouds, .city-speed { animation: none; }
        }
      `}</style>
    </div>
  );
};
