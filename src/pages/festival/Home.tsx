import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Play,
  Ticket,
  Calendar,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Users,
  Sparkles,
  BookOpen,
  Film,
  Palette,
  Mic2,
  Crown,
} from "lucide-react";
import EventCard from "@/components/festival/EventCard";
import BlogCard from "@/components/festival/BlogCard";
import { events, blogs, partners, magazineIssues } from "@/components/festival/data";

/* Hindi film industry / festival b-roll (free-use, CDN-hosted sample).
   The browser will autoplay muted + inline. */
const HERO_VIDEO_MP4 =
  "https://cdn.coverr.co/videos/coverr-old-cinema-projector-running-3613/1080p.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=70";

/* ------------------------------------------------------------------ */
/*  HERO                                                              */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
      >
        <source src={HERO_VIDEO_MP4} type="video/mp4" />
      </video>
      <div className="hero-veil" />

      <div className="relative z-10 fest-container h-full flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-3xl reveal">
          <span className="badge-dot">LIVE · 14&ndash;22 NOV 2026 · MUMBAI</span>
          <h1 className="font-display font-bold leading-[0.95] mt-4 text-[clamp(2.6rem,6.5vw,5.5rem)] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]">
            Where Hindi Cinema, <br className="hidden md:block" />
            <span className="text-gold italic">Adab</span> &amp; Art Find Their Stage.
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed">
            A 9-day festival celebrating the soul of Indian storytelling &mdash; from Guru Dutt
            retrospectives to Urdu mehfils, indie film premieres aur living gallery walks across India.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to="/festival/book" className="btn-primary">
              <Ticket size={18} /> Book Your Pass
            </Link>
            <a
              href="#hot-now"
              className="btn-ghost"
            >
              <Play size={16} /> Hot &amp; Happening
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 max-w-md gap-3">
            <Stat n="120+" l="Films" />
            <Stat n="40+" l="Writers" />
            <Stat n="9" l="Cities" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="fest-container py-3 marquee">
          <div className="marquee-track font-bebas tracking-[0.3em] text-white/70 text-sm">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex gap-12">
                <span>&#10038; CINEMA &nbsp;&middot;&nbsp; ADAB &nbsp;&middot;&nbsp; KALA</span>
                <span>&#10038; GURU DUTT RETROSPECTIVE</span>
                <span>&#10038; JAIPUR LITFEST PARTNER</span>
                <span>&#10038; LIVE QAWWALI AT AMER FORT</span>
                <span>&#10038; INDIE FRAMES 2026</span>
                <span>&#10038; KALA GHODA ART WALK</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl text-white">{n}</div>
      <div className="font-bebas tracking-[0.22em] text-xs text-white/70 mt-1">{l}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NEXT EVENT (countdown)                                            */
/* ------------------------------------------------------------------ */
const NEXT_EVENT_DATE = new Date("2026-11-14T19:30:00+05:30").getTime();

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function NextEvent() {
  const { d, h, m, s } = useCountdown(NEXT_EVENT_DATE);
  const featured = events[0];
  return (
    <section className="relative py-20 md:py-28">
      <div className="fest-container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative img-zoom rounded-[1.5rem] overflow-hidden border border-[hsl(35_15%_22%)]">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full aspect-[4/3] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/10 to-transparent" />
          <span className="absolute top-4 left-4 tag crimson">OPENING NIGHT</span>
        </div>

        <div>
          <span className="section-kicker">The Next Spectacle</span>
          <h2 className="section-title mt-3">
            Cinema Under the Stars: <span className="text-gold italic">A Tribute to Guru Dutt</span>
          </h2>
          <p className="mt-4 text-[hsl(35_12%_75%)] leading-relaxed max-w-xl">
            Opening night of Rang Manch 2026. A 35mm screening of <em>Pyaasa</em> at Bandra Fort
            preceded by a live ghazal prelude. Curated by Karan Bhalla.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-[hsl(35_12%_75%)]">
            <span className="inline-flex items-center gap-2"><Calendar size={16} className="text-[hsl(38_96%_58%)]" /> 14 Nov 2026 · 7:30 PM</span>
            <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-[hsl(38_96%_58%)]" /> Bandra Fort, Mumbai</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { v: d, l: "Days" },
              { v: h, l: "Hours" },
              { v: m, l: "Minutes" },
              { v: s, l: "Seconds" },
            ].map((c) => (
              <div key={c.l} className="count-tile">
                <div className="count-num">{String(c.v).padStart(2, "0")}</div>
                <div className="count-lbl">{c.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/festival/book" className="btn-primary"><Ticket size={16} /> Reserve Seat</Link>
            <Link to="/festival/events" className="btn-outline-gold">View Full Lineup <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HOT N HAPPENING — Upcoming Events Listings                        */
/* ------------------------------------------------------------------ */
type Filter = "All" | "Film" | "Literature" | "Art" | "Music" | "Theatre";
const FILTERS: Filter[] = ["All", "Film", "Literature", "Art", "Music", "Theatre"];

function HotNHappening() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = useMemo(
    () => (filter === "All" ? events : events.filter((e) => e.category === filter)),
    [filter]
  );
  return (
    <section id="hot-now" className="py-20 md:py-28 bg-[hsl(18_18%_8%)] border-y border-[hsl(35_15%_18%)]">
      <div className="fest-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-kicker">Hot &amp; Happening</span>
            <h2 className="section-title mt-3">
              Upcoming <span className="text-gold italic">festivals &amp; events</span>
            </h2>
            <p className="mt-3 max-w-xl text-[hsl(35_12%_75%)]">
              Films, mehfils, art walks aur live performances &mdash; sab kuch ek hi calendar par.
            </p>
          </div>
          <Link to="/festival/events" className="btn-outline-gold self-start md:self-auto">
            See all events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
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

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((ev) => (
            <EventCard key={ev.id} ev={ev} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  OUR PHILOSOPHY / IDEA                                             */
/* ------------------------------------------------------------------ */
function Philosophy() {
  const pillars = [
    { Icon: Film,    title: "Cinema as Memory",   text: "We screen the films that shaped a nation's imagination — and the new ones daring to reshape it." },
    { Icon: BookOpen, title: "Literature as Resistance", text: "From Manto to Mahasweta, words that refused silence still find a baithak at Rang Manch." },
    { Icon: Palette,  title: "Art as Language",    text: "We host living galleries where every brushstroke is a conversation, not a commodity." },
    { Icon: Mic2,     title: "Voices, not Volume", text: "We platform under-heard artists from across India's twenty-two official languages." },
  ];
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(24 95% 56% / 0.7), transparent 70%)" }}
      />
      <div className="fest-container relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="section-kicker">Our Idea &middot; Our Philosophy</span>
            <h2 className="section-title mt-3">
              Stories are how India <span className="text-gold italic">remembers</span> itself.
            </h2>
            <p className="mt-5 text-[hsl(35_12%_75%)] leading-relaxed">
              Rang Manch is not a festival. It is a mehfil. A long, unhurried conversation between
              filmmakers, poets, painters and the people who love them. We believe culture is not
              consumed &mdash; it is shared, around chai, under a peepal tree, on a borrowed stage.
            </p>
            <p className="mt-4 text-[hsl(35_12%_75%)] leading-relaxed">
              Every event we curate is a small act of faith in the idea that art still matters &mdash;
              especially in the noisiest decade we have ever lived through.
            </p>
            <Link to="/festival/about" className="btn-outline-gold mt-6">
              Read our manifesto <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {pillars.map(({ Icon, title, text }) => (
              <div key={title} className="fest-card p-6">
                <div className="w-11 h-11 rounded-xl grid place-items-center bg-[hsl(38_96%_58%/0.12)] border border-[hsl(38_96%_58%/0.35)] text-[hsl(38_96%_58%)]">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-xl font-semibold mt-4">{title}</h3>
                <p className="mt-2 text-sm text-[hsl(35_12%_75%)] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BOOK EVENT — CTA banner                                           */
/* ------------------------------------------------------------------ */
function BookEventCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="fest-container">
        <div className="relative overflow-hidden rounded-[2rem] border border-[hsl(38_96%_58%/0.35)]">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=70"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, hsl(12 12% 6% / 0.95) 30%, hsl(24 95% 28% / 0.65) 100%)",
            }}
          />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-14 items-center">
            <div>
              <span className="section-kicker">Book Your Festival</span>
              <h2 className="section-title mt-3">
                Reserve your seat at the <span className="text-gold italic">mehfil</span>.
              </h2>
              <p className="mt-3 text-[hsl(35_12%_85%)] max-w-md">
                Single-event passes start at &#8377;200. Festival passes give you priority entry,
                curated walks aur after-hours adda access.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-[hsl(12_12%_6%/0.7)] border border-[hsl(35_15%_22%)] rounded-[1.25rem] p-6 backdrop-blur-md"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="fest-label">Select Event</label>
                  <select className="fest-input" defaultValue="">
                    <option value="" disabled>Choose…</option>
                    {events.map((e) => <option key={e.id}>{e.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="fest-label">Passes</label>
                  <select className="fest-input" defaultValue="1">
                    {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="fest-label">Your Email</label>
                  <input className="fest-input" type="email" placeholder="you@email.com" />
                </div>
              </div>
              <button className="btn-primary mt-5 w-full justify-center">
                <Ticket size={18} /> Book Now
              </button>
              <p className="text-xs text-[hsl(35_12%_60%)] mt-3 text-center">
                Secure checkout · 100% refundable up to 48h before show
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BLOGS                                                             */
/* ------------------------------------------------------------------ */
function BlogsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="fest-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-kicker">Stories &amp; Essays</span>
            <h2 className="section-title mt-3">
              From the <span className="text-gold italic">journal</span>
            </h2>
          </div>
          <Link to="/festival/blogs" className="btn-outline-gold self-start md:self-auto">
            Read all stories <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {blogs.map((b) => <BlogCard key={b.id} b={b} />)}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAGAZINE                                                          */
/* ------------------------------------------------------------------ */
function Magazine() {
  return (
    <section className="py-20 md:py-28 bg-[hsl(18_18%_8%)] border-y border-[hsl(35_15%_18%)] relative overflow-hidden">
      <div className="fest-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-kicker">Rang Magazine</span>
            <h2 className="section-title mt-3">
              The quarterly the <span className="text-gold italic">cinephiles</span> collect
            </h2>
            <p className="mt-3 max-w-xl text-[hsl(35_12%_75%)]">
              Long-form essays, festival diaries, archival photographs aur unseen scripts &mdash;
              printed in Mumbai, posted to your door.
            </p>
          </div>
          <Link to="/festival/magazine" className="btn-outline-gold self-start md:self-auto">
            Subscribe &amp; archive <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {magazineIssues.map((m) => (
            <article key={m.id} className="fest-card group">
              <div className="img-zoom aspect-[3/4] relative">
                <img src={m.cover} alt={m.title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-bebas tracking-[0.2em] text-[hsl(38_96%_58%)] text-xs">{m.date}</p>
                  <h3 className="font-display text-lg md:text-xl font-semibold mt-1 leading-snug text-white">
                    {m.title}
                  </h3>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <span className="text-sm text-[hsl(35_12%_75%)]">Print + Digital</span>
                <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(38_96%_58%)]">
                  Read excerpt <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MEMBERSHIP                                                        */
/* ------------------------------------------------------------------ */
function Membership() {
  const tiers = [
    {
      name: "Rasik",
      price: "₹999",
      cadence: "per year",
      perks: ["Festival pass discounts (15%)", "Quarterly digital magazine", "Members-only newsletter"],
      featured: false,
    },
    {
      name: "Mehfil",
      price: "₹2,999",
      cadence: "per year",
      perks: ["All Rasik perks", "Priority booking 48h early", "Print magazine to your door", "Invite to monthly screening"],
      featured: true,
    },
    {
      name: "Patron",
      price: "₹15,000",
      cadence: "per year",
      perks: ["All Mehfil perks", "2 festival passes + +1", "Artist meet-and-greet", "Name in festival programme"],
      featured: false,
    },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="fest-container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-kicker justify-center">Become Our Member</span>
          <h2 className="section-title mt-3">
            Join the <span className="text-gold italic">Mehfil</span>
          </h2>
          <p className="mt-3 text-[hsl(35_12%_75%)]">
            Members fund the curation, the artists aur the seat that stays free for a student.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`fest-card p-7 ${t.featured ? "border-[hsl(38_96%_58%)] shadow-[0_25px_60px_-25px_hsl(24_95%_56%/0.5)]" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                {t.featured && <span className="tag crimson"><Crown size={12} className="mr-1" />Most loved</span>}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-gold">{t.price}</span>
                <span className="text-sm text-[hsl(35_12%_70%)]">{t.cadence}</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-[hsl(40_30%_96%/0.85)]">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Sparkles size={14} className="text-[hsl(38_96%_58%)] mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <Link
                to="/festival/membership"
                className={`mt-7 w-full justify-center ${t.featured ? "btn-primary" : "btn-outline-gold"}`}
              >
                Join as {t.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TEAM BUILDING                                                     */
/* ------------------------------------------------------------------ */
function TeamBuilding() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="fest-container grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <span className="section-kicker">Team Building &amp; Volunteering</span>
          <h2 className="section-title mt-3">
            Help us run the <span className="text-gold italic">mehfil</span>.
          </h2>
          <p className="mt-4 text-[hsl(35_12%_75%)] leading-relaxed max-w-xl">
            Rang Manch is built by a tiny core team and a wide circle of volunteers, designers,
            translators aur film students. Whether you have 4 hours or 4 weeks, there is a chair
            for you at our table.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[
              { Icon: Users,    h: "Volunteer Crew",  t: "On-ground hospitality, registrations, audience management." },
              { Icon: Film,     h: "Festival Interns", t: "Curation assistants, programming, archive research." },
              { Icon: Palette,  h: "Design Studio",   t: "Posters, signage, social — paid project briefs." },
              { Icon: BookOpen, h: "Storytellers",    t: "Field reporting, photo essays, magazine pitches." },
            ].map(({ Icon, h, t }) => (
              <div key={h} className="rounded-2xl border border-[hsl(35_15%_22%)] p-5 bg-[hsl(18_18%_9%/0.6)]">
                <Icon size={20} className="text-[hsl(38_96%_58%)]" />
                <h4 className="font-display text-lg font-semibold mt-2">{h}</h4>
                <p className="text-sm text-[hsl(35_12%_75%)] mt-1">{t}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/festival/team" className="btn-primary">Join the crew <ArrowRight size={16} /></Link>
            <Link to="/festival/team" className="btn-ghost">Meet our team</Link>
          </div>
        </div>

        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
          {[
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=70",
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=70",
            "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=70",
            "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=900&q=70",
          ].map((src, i) => (
            <div
              key={src}
              className={`img-zoom rounded-2xl border border-[hsl(35_15%_22%)] overflow-hidden ${
                i % 2 === 0 ? "translate-y-4" : ""
              }`}
            >
              <img src={src} alt="festival crew" loading="lazy" className="w-full h-full object-cover aspect-[4/5]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PARTNERS                                                          */
/* ------------------------------------------------------------------ */
function Partners() {
  return (
    <section className="py-14 border-y border-[hsl(35_15%_18%)] bg-[hsl(12_12%_5%)]">
      <div className="fest-container">
        <p className="text-center font-bebas tracking-[0.25em] text-[hsl(35_12%_70%)] text-sm">
          Partners &amp; cultural collaborators
        </p>
        <div className="mt-6 marquee">
          <div className="marquee-track">
            {[...partners, ...partners].map((p, i) => (
              <span key={`${p}-${i}`} className="font-display text-xl md:text-2xl text-[hsl(40_30%_96%/0.55)] hover:text-[hsl(38_96%_58%)] transition-colors">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */
export default function FestivalHome() {
  return (
    <>
      <Hero />
      <Partners />
      <NextEvent />
      <HotNHappening />
      <Philosophy />
      <BookEventCTA />
      <BlogsSection />
      <Magazine />
      <Membership />
      <TeamBuilding />
    </>
  );
}
