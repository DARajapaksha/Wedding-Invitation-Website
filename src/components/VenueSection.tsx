import { WEDDING } from "../config";

export default function VenueSection() {
  return (
    <section
      className="relative overflow-hidden px-6 py-28 text-center"
      style={{
        backgroundImage: "url('/images/3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Layered overlays for depth (neutral, no red tint) */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)" }} />
      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }} />

      <div className="relative z-10 mx-auto max-w-xl animate-fade-in-up delay-100">

        {/* Section label */}
        <p style={{ fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(225,210,170,0.75)", fontFamily: "'Montserrat', sans-serif", marginBottom: "1rem" }}>
          Celebrating Together
        </p>

        {/* Heading */}
        <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.5rem, 7vw, 4rem)", color: "#fff", lineHeight: 1.1, marginBottom: "0.5rem" }}>
          When &amp; Where
        </h2>

        {/* Gold rule */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.5rem auto", maxWidth: "200px" }}>
          <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, rgba(193,162,107,0.8))" }} />
          <svg width="7" height="7" viewBox="0 0 7 7" fill="rgba(193,162,107,0.9)" aria-hidden><rect x="1" y="1" width="5" height="5" transform="rotate(45 3.5 3.5)"/></svg>
          <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, rgba(193,162,107,0.8))" }} />
        </div>

        {/* Glass card */}
        <div
          className="glass-card rounded-2xl p-10 sm:p-14 text-center"
          style={{ background: "rgba(255,252,247,0.88)" }}
        >
          <div className="space-y-10">

            {/* Date & Time */}
            <div className="space-y-3">
              <p style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                Date &amp; Time
              </p>
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem", color: "var(--primary)", lineHeight: 1.2 }}>
                {WEDDING.dateLabel}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "var(--foreground)", letterSpacing: "0.06em" }}>
                {WEDDING.timeLabel}
              </p>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, var(--gold-mid))" }} />
              <svg width="6" height="6" viewBox="0 0 6 6" fill="var(--gold-mid)" aria-hidden><rect x="1" y="1" width="4" height="4" transform="rotate(45 3 3)"/></svg>
              <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, var(--gold-mid))" }} />
            </div>

            {/* Venue */}
            <div className="space-y-3">
              <p style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                Venue
              </p>
              <div className="flex items-center justify-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", color: "var(--foreground)", letterSpacing: "0.04em", fontWeight: 500 }}>
                  {WEDDING.venue}
                </p>
              </div>
              <p style={{ fontSize: "10px", letterSpacing: "0.25em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>
                {WEDDING.location}
              </p>
            </div>

            {/* Map button */}
            <div className="pt-2">
              <a
                href={WEDDING.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2"
                style={{ textDecoration: "none" }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                View on Map
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
