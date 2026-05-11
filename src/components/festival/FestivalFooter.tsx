import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function FestivalFooter() {
  return (
    <footer className="fest-footer border-t border-[hsl(35_15%_22%)] bg-[hsl(12_12%_5%)] mt-24">
      <div className="fest-container py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(38_96%_58%)] via-[hsl(24_95%_56%)] to-[hsl(356_75%_48%)] grid place-items-center">
                <span className="font-display italic text-[#1a0f04] text-xl font-bold">R</span>
              </span>
              <span className="font-display text-xl font-semibold">Rang Manch</span>
            </div>
            <p className="mt-4 text-sm text-[hsl(35_12%_70%)] leading-relaxed">
              India ka premier festival celebrating art, cinema aur literature. Where stories meet stages and ideas
              find their audience.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Instagram, Youtube, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 grid place-items-center rounded-full border border-[hsl(35_15%_22%)] text-[hsl(40_30%_96%)] hover:border-[hsl(38_96%_58%)] hover:text-[hsl(38_96%_58%)] transition-colors"
                  aria-label="social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bebas tracking-[0.22em] text-[hsl(38_96%_58%)] mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[hsl(40_30%_96%/0.85)]">
              <li><Link to="/festival/events">Upcoming Events</Link></li>
              <li><Link to="/festival/blogs">Blogs &amp; Stories</Link></li>
              <li><Link to="/festival/magazine">Rang Magazine</Link></li>
              <li><Link to="/festival/about">Our Philosophy</Link></li>
              <li><Link to="/festival/team">The Team</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas tracking-[0.22em] text-[hsl(38_96%_58%)] mb-4">Participate</h4>
            <ul className="space-y-2.5 text-sm text-[hsl(40_30%_96%/0.85)]">
              <li><Link to="/festival/book">Book Tickets</Link></li>
              <li><Link to="/festival/membership">Become a Member</Link></li>
              <li><Link to="/festival/team">Volunteer</Link></li>
              <li><a href="#">Submit a Film</a></li>
              <li><a href="#">Submit a Story</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas tracking-[0.22em] text-[hsl(38_96%_58%)] mb-4">Reach Us</h4>
            <ul className="space-y-3 text-sm text-[hsl(40_30%_96%/0.85)]">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-[hsl(38_96%_58%)]" />Bandra Reclamation, Mumbai 400050</li>
              <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 text-[hsl(38_96%_58%)]" />hello@rangmanch.fest</li>
              <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 text-[hsl(38_96%_58%)]" />+91 98XXX 67890</li>
            </ul>

            <div className="mt-5">
              <p className="fest-label mb-2">Newsletter</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input className="fest-input !py-2 !px-3 text-sm" placeholder="your@email.com" />
                <button className="btn-primary !py-2 !px-4 text-sm">Join</button>
              </form>
            </div>
          </div>
        </div>

        <div className="ornament mt-14 mb-6">
          <span className="font-display italic text-[hsl(38_96%_58%)]">&#10038;</span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[hsl(35_12%_60%)]">
          <p>&copy; {new Date().getFullYear()} Rang Manch Foundation. All rights reserved.</p>
          <p>Crafted with chai &amp; cinema in Mumbai.</p>
        </div>
      </div>
    </footer>
  );
}
