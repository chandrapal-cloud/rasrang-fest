import { Sparkles, Crown, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Rasik",
    price: "₹999",
    cadence: "/ year",
    perks: [
      "15% off all festival passes",
      "Quarterly digital magazine",
      "Members-only weekly newsletter",
      "Early access to programme reveals",
    ],
    featured: false,
  },
  {
    name: "Mehfil",
    price: "₹2,999",
    cadence: "/ year",
    perks: [
      "All Rasik perks",
      "Priority booking 48h early",
      "Print magazine to your door",
      "Invite to monthly closed screenings",
      "Free entry to one mehfil per month",
    ],
    featured: true,
  },
  {
    name: "Patron",
    price: "₹15,000",
    cadence: "/ year",
    perks: [
      "All Mehfil perks",
      "2 festival passes + 1 guest pass",
      "Artist meet-and-greet evenings",
      "Name in festival programme",
      "Invitation to annual patrons' dinner",
    ],
    featured: false,
  },
];

export default function Membership() {
  return (
    <div className="py-16 md:py-24">
      <div className="fest-container">
        <div className="max-w-2xl">
          <span className="section-kicker">Become Our Member</span>
          <h1 className="section-title mt-3">
            Join the <span className="text-gold italic">Mehfil</span>
          </h1>
          <p className="mt-4 text-[hsl(35_12%_85%)] leading-relaxed">
            Members make Rang Manch possible. Aapki membership pays for the artist, the chai aur
            the seat that stays free for a student who could not afford one.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`fest-card p-8 ${t.featured ? "border-[hsl(38_96%_58%)] shadow-[0_25px_60px_-25px_hsl(24_95%_56%/0.5)]" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                {t.featured && (
                  <span className="tag crimson inline-flex items-center">
                    <Crown size={12} className="mr-1" /> Most loved
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold text-gold">{t.price}</span>
                <span className="text-sm text-[hsl(35_12%_70%)]">{t.cadence}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[hsl(40_30%_96%/0.9)]">
                    <Check size={16} className="text-[hsl(38_96%_58%)] mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full justify-center ${t.featured ? "btn-primary" : "btn-outline-gold"}`}>
                <Sparkles size={16} /> Join as {t.name}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 fest-card p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold">
              Corporate &amp; institutional patronage
            </h2>
            <p className="mt-3 text-[hsl(35_12%_75%)]">
              Sponsor a stage, a screening series or an entire literary track. Custom packages,
              CSR-compliant invoicing and full visibility across our festival ecosystem.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link to="/festival/book" className="btn-primary">
              Talk to partnerships <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
