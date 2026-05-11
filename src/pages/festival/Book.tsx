import { useState } from "react";
import { Ticket, CheckCircle2 } from "lucide-react";
import { events } from "@/components/festival/data";

export default function Book() {
  const [done, setDone] = useState(false);
  return (
    <div className="py-16 md:py-24">
      <div className="fest-container max-w-4xl">
        <span className="section-kicker">Book Your Festival</span>
        <h1 className="section-title mt-3">
          Reserve your seat at <span className="text-gold italic">Rang Manch 2026</span>
        </h1>

        {done ? (
          <div className="fest-card mt-10 p-10 text-center">
            <CheckCircle2 size={48} className="mx-auto text-[hsl(38_96%_58%)]" />
            <h2 className="font-display text-3xl mt-4">Booking received!</h2>
            <p className="mt-3 text-[hsl(35_12%_75%)]">
              Aapko confirmation email bheja gaya hai. See you at the mehfil &mdash; chai is on us.
            </p>
            <button className="btn-outline-gold mt-6" onClick={() => setDone(false)}>
              Book another
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="mt-10 fest-card p-7 md:p-10 grid md:grid-cols-2 gap-5"
          >
            <div className="md:col-span-2">
              <label className="fest-label">Select Event</label>
              <select className="fest-input" required defaultValue="">
                <option value="" disabled>Choose an event…</option>
                {events.map((e) => (
                  <option key={e.id}>
                    {e.title} &mdash; {e.date}, {e.city}
                  </option>
                ))}
                <option>Full Festival Pass &mdash; ₹4,999 (9 days, all cities)</option>
              </select>
            </div>

            <div>
              <label className="fest-label">Pass Type</label>
              <select className="fest-input">
                <option>Single Entry</option>
                <option>Couple</option>
                <option>Family of 4</option>
                <option>Student (with ID)</option>
              </select>
            </div>

            <div>
              <label className="fest-label">Number of Passes</label>
              <input className="fest-input" type="number" min={1} defaultValue={1} />
            </div>

            <div>
              <label className="fest-label">Full Name</label>
              <input className="fest-input" required placeholder="As on ID" />
            </div>

            <div>
              <label className="fest-label">Phone</label>
              <input className="fest-input" required placeholder="+91" />
            </div>

            <div className="md:col-span-2">
              <label className="fest-label">Email</label>
              <input className="fest-input" type="email" required placeholder="you@email.com" />
            </div>

            <div className="md:col-span-2">
              <label className="fest-label">Any access or dietary needs?</label>
              <textarea className="fest-input min-h-[100px]" placeholder="Optional…" />
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[hsl(35_15%_22%)]">
              <p className="text-sm text-[hsl(35_12%_75%)]">
                Total: <span className="font-display text-xl text-gold">₹ 499</span> &middot; refundable until 48h before.
              </p>
              <button type="submit" className="btn-primary">
                <Ticket size={16} /> Pay &amp; Confirm
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
