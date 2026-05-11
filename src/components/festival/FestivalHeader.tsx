import { NavLink, Link } from "react-router-dom";
import { Menu, X, Ticket } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { to: "/festival", label: "Home", end: true },
  { to: "/festival/events", label: "Events" },
  { to: "/festival/blogs", label: "Blogs" },
  { to: "/festival/magazine", label: "Magazine" },
  { to: "/festival/about", label: "Our Philosophy" },
  { to: "/festival/team", label: "Team" },
  { to: "/festival/membership", label: "Membership" },
];

export default function FestivalHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(12_12%_6%/0.85)] backdrop-blur-md border-b border-[hsl(35_15%_22%/0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="fest-container flex items-center justify-between h-[72px]">
        <Link to="/festival" className="flex items-center gap-2.5 group">
          <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(38_96%_58%)] via-[hsl(24_95%_56%)] to-[hsl(356_75%_48%)] grid place-items-center shadow-[0_8px_25px_-8px_hsl(24_95%_56%/0.7)]">
            <span className="font-display italic text-[#1a0f04] text-xl font-bold leading-none">R</span>
            <span className="absolute -inset-1 rounded-full border border-[hsl(38_96%_58%/0.35)] animate-pulse" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight">Rang&nbsp;Manch</span>
            <span className="font-bebas text-[0.65rem] tracking-[0.25em] text-[hsl(35_12%_70%)]">
              Art &middot; Films &middot; Literature
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/festival/book" className="btn-primary text-sm">
            <Ticket size={16} /> Book Tickets
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-full border border-[hsl(35_15%_22%)] text-[hsl(40_30%_96%)]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[hsl(12_12%_6%/0.96)] backdrop-blur-md border-t border-[hsl(35_15%_22%)]">
          <div className="fest-container py-5 flex flex-col gap-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `nav-link text-base ${isActive ? "active" : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/festival/book" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">
              <Ticket size={16} /> Book Tickets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
