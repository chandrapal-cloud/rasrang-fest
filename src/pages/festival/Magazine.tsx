import { ArrowUpRight, BookOpen } from "lucide-react";
import { magazineIssues } from "@/components/festival/data";

export default function Magazine() {
  return (
    <div className="py-16 md:py-24">
      <div className="fest-container">
        <div className="grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <span className="section-kicker">Rang Magazine</span>
            <h1 className="section-title mt-3">
              A quarterly on Indian <span className="text-gold italic">cinema, adab &amp; kala</span>
            </h1>
            <p className="mt-4 text-[hsl(35_12%_85%)] leading-relaxed">
              Edited in Mumbai, printed on uncoated heritage paper aur posted to readers across
              India and the diaspora. Each issue is a slow read &mdash; long-form essays, never-published
              scripts, festival diaries, photo essays aur poetry in three scripts.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-primary"><BookOpen size={16} /> Subscribe — ₹1,499 / year</button>
              <button className="btn-outline-gold">Submit a pitch</button>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden border border-[hsl(35_15%_22%)]">
            <img
              src={magazineIssues[0].cover}
              alt="Latest issue"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-bebas tracking-[0.25em] text-[hsl(38_96%_58%)] text-sm">Latest Issue</p>
              <h3 className="font-display text-2xl md:text-3xl text-white mt-1">
                {magazineIssues[0].title}
              </h3>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-semibold">Archive</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {magazineIssues.concat(magazineIssues).map((m, i) => (
              <article key={`${m.id}-${i}`} className="fest-card group">
                <div className="img-zoom aspect-[3/4] relative">
                  <img src={m.cover} alt={m.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-bebas tracking-[0.2em] text-[hsl(38_96%_58%)] text-xs">{m.date}</p>
                    <h3 className="font-display text-lg font-semibold mt-1 leading-snug text-white">
                      {m.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <span className="text-sm text-[hsl(35_12%_75%)]">PDF + Print</span>
                  <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(38_96%_58%)]">
                    Read excerpt <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
