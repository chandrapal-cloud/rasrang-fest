import { Sparkles, Heart, Globe2, Library } from "lucide-react";

export default function About() {
  return (
    <div className="py-16 md:py-24">
      <div className="fest-container">
        <div className="max-w-3xl">
          <span className="section-kicker">Our Idea &middot; Our Philosophy</span>
          <h1 className="section-title mt-3">
            A festival is not <span className="text-gold italic">an event</span>. It is a memory we make together.
          </h1>
          <p className="mt-5 text-lg text-[hsl(35_12%_85%)] leading-relaxed">
            Rang Manch began in a one-room flat in Bandra over a kettle of cutting chai. A
            filmmaker, a poet aur a painter argued about whether art in India was dying or just
            sleeping. By dawn we had a list of artists we wanted to host. By next monsoon, we had a
            festival.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {[
            { Icon: Heart,   t: "Curated, not crowded",
              p: "We choose fewer events but stay with them longer. No filler. No fluff." },
            { Icon: Globe2,  t: "Many Indias, one stage",
              p: "We programme across at least twelve languages every year — by design, not as tokens." },
            { Icon: Library, t: "Archive as art",
              p: "Every screening, mehfil and walk becomes a recording, an essay, a magazine page." },
          ].map(({ Icon, t, p }) => (
            <div key={t} className="fest-card p-7">
              <Icon size={22} className="text-[hsl(38_96%_58%)]" />
              <h3 className="font-display text-xl font-semibold mt-3">{t}</h3>
              <p className="mt-2 text-sm text-[hsl(35_12%_75%)]">{p}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 prose-festival">
            <h2 className="font-display text-3xl font-bold">The Manifesto</h2>
            <div className="mt-5 space-y-5 text-[hsl(40_30%_96%/0.9)] leading-relaxed">
              <p>
                We believe Indian audiences are smarter than the algorithms that sell to them. We believe
                a 90-year-old short story can still rewire a 19-year-old's life. We believe a film deserves
                a screen and a screen deserves stillness.
              </p>
              <p>
                We will keep tickets affordable. We will pay artists fairly. We will not chase trends. We
                will hold the mehfil even on small nights, when only fifteen people show up &mdash; because
                those fifteen are tomorrow's makers.
              </p>
              <p className="font-display italic text-[hsl(38_96%_58%)] text-xl">
                &ldquo;Art is the longest argument a country can have with itself. We want India to keep arguing.&rdquo;
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5 fest-card p-8">
            <Sparkles size={22} className="text-[hsl(38_96%_58%)]" />
            <h3 className="font-display text-2xl font-semibold mt-3">By the numbers</h3>
            <dl className="mt-5 grid grid-cols-2 gap-y-5">
              {[
                ["7", "years"],
                ["540+", "artists hosted"],
                ["62", "languages featured"],
                ["1.2L+", "audience members"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl text-gold">{n}</dt>
                  <dd className="font-bebas tracking-[0.2em] text-xs text-[hsl(35_12%_70%)] mt-1">{l}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
