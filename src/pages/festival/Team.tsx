import { ArrowRight } from "lucide-react";
import { team } from "@/components/festival/data";

export default function Team() {
  return (
    <div className="py-16 md:py-24">
      <div className="fest-container">
        <div className="max-w-2xl">
          <span className="section-kicker">The Team &amp; Volunteers</span>
          <h1 className="section-title mt-3">
            The people who hold the <span className="text-gold italic">mehfil</span> together
          </h1>
          <p className="mt-4 text-[hsl(35_12%_85%)] leading-relaxed">
            A core crew of six humans, a wide circle of curators, aur an ever-rotating set of
            volunteers who believe Indian stories deserve a bigger stage.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m) => (
            <article key={m.name} className="fest-card group">
              <div className="img-zoom aspect-[4/5]">
                <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                <p className="font-bebas tracking-[0.2em] text-[hsl(38_96%_58%)] text-sm mt-1">{m.role}</p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-24 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="section-kicker">Volunteer With Us</span>
            <h2 className="section-title mt-3">
              Build the festival from the <span className="text-gold italic">inside</span>
            </h2>
            <p className="mt-4 text-[hsl(35_12%_75%)] leading-relaxed">
              Our volunteer programme welcomes students, working professionals aur artists. You'll
              get an inside look at curation, run real shifts, and walk away with a network that
              lasts long after the lights go down.
            </p>
            <ul className="mt-6 space-y-2 text-[hsl(40_30%_96%/0.9)]">
              <li>&middot; Festival volunteer kit + tee</li>
              <li>&middot; Free entry to all events you crew</li>
              <li>&middot; Certificate + reference letter</li>
              <li>&middot; Priority slot in next year's intern cohort</li>
            </ul>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="fest-card p-7">
            <h3 className="font-display text-2xl font-semibold">Apply to volunteer</h3>
            <div className="mt-5 space-y-4">
              <div>
                <label className="fest-label">Full name</label>
                <input className="fest-input" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="fest-label">City</label>
                  <input className="fest-input" required />
                </div>
                <div>
                  <label className="fest-label">Phone</label>
                  <input className="fest-input" required />
                </div>
              </div>
              <div>
                <label className="fest-label">Which track interests you most?</label>
                <select className="fest-input">
                  <option>Cinema crew</option>
                  <option>Literature mehfils</option>
                  <option>Art walks</option>
                  <option>Production / logistics</option>
                  <option>Design &amp; social</option>
                </select>
              </div>
              <div>
                <label className="fest-label">Why do you want to join?</label>
                <textarea className="fest-input min-h-[110px]" />
              </div>
            </div>
            <button className="btn-primary mt-6 w-full justify-center">
              Send application <ArrowRight size={16} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
