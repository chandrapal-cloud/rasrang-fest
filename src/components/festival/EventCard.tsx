import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export type Event = {
  id: string;
  title: string;
  category: "Film" | "Literature" | "Art" | "Music" | "Theatre";
  date: string;
  city: string;
  image: string;
  blurb: string;
  priceFrom?: number;
  featured?: boolean;
};

export default function EventCard({ ev }: { ev: Event }) {
  return (
    <article className="fest-card film-grain group flex flex-col">
      <div className="img-zoom relative aspect-[4/3]">
        <img src={ev.image} alt={ev.title} loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <span className={`tag absolute top-3 left-3 ${ev.category === "Film" ? "" : ev.category === "Literature" ? "ivory" : "crimson"}`}>
          {ev.category}
        </span>
        {ev.featured && (
          <span className="absolute top-3 right-3 tag crimson">FEATURED</span>
        )}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-display text-xl font-semibold leading-snug">{ev.title}</h3>
        <p className="text-sm text-[hsl(35_12%_70%)] line-clamp-2">{ev.blurb}</p>
        <div className="flex items-center gap-4 text-xs text-[hsl(35_12%_70%)] mt-1">
          <span className="inline-flex items-center gap-1.5"><Calendar size={14} className="text-[hsl(38_96%_58%)]" /> {ev.date}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-[hsl(38_96%_58%)]" /> {ev.city}</span>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[hsl(35_15%_22%)]">
          {ev.priceFrom !== undefined ? (
            <span className="font-bebas tracking-[0.18em] text-[hsl(38_96%_58%)]">
              {ev.priceFrom === 0 ? "FREE ENTRY" : `FROM \u20B9${ev.priceFrom}`}
            </span>
          ) : <span />}
          <Link to="/festival/book" className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(40_30%_96%)] group-hover:text-[hsl(38_96%_58%)] transition-colors">
            Book Now <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
