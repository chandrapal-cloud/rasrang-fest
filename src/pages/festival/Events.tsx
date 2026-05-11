import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import EventCard from "@/components/festival/EventCard";
import { events } from "@/components/festival/data";

type Filter = "All" | "Film" | "Literature" | "Art" | "Music" | "Theatre";
const FILTERS: Filter[] = ["All", "Film", "Literature", "Art", "Music", "Theatre"];

export default function Events() {
  const [filter, setFilter] = useState<Filter>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = filter === "All" ? events : events.filter((e) => e.category === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter((e) => `${e.title} ${e.city} ${e.blurb}`.toLowerCase().includes(s));
    }
    return l;
  }, [filter, q]);

  return (
    <div className="py-16 md:py-24">
      <div className="fest-container">
        <span className="section-kicker">Festival Calendar</span>
        <h1 className="section-title mt-3">Upcoming events &amp; festivals</h1>
        <p className="mt-3 max-w-2xl text-[hsl(35_12%_75%)]">
          Nine days. Nine cities. Films, mehfils, art walks aur live performances — har ek apna rang lekar.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <div className="relative md:flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(35_12%_60%)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="fest-input pl-10"
              placeholder="Search by title, city or theme…"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-bebas tracking-[0.2em] text-sm px-4 py-2 rounded-full border transition-colors ${
                  filter === f
                    ? "bg-[hsl(38_96%_58%)] text-[#1a0f04] border-[hsl(38_96%_58%)]"
                    : "border-[hsl(35_15%_22%)] text-[hsl(40_30%_96%/0.8)] hover:border-[hsl(38_96%_58%/0.6)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((e) => <EventCard key={e.id} ev={e} />)}
        </div>

        {list.length === 0 && (
          <div className="mt-16 text-center text-[hsl(35_12%_70%)]">
            <p className="font-display text-2xl">Kuch nahi mila.</p>
            <p className="mt-2">Try a different filter or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
