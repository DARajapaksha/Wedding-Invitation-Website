import { WEDDING } from "../config";

/** Elegant floral divider SVG */
function FloralDivider() {
  return (
    <div className="my-8 flex items-center justify-center gap-3 w-full px-4">
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, var(--gold-mid))" }} />
      <svg width="48" height="22" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ color: "var(--gold-mid)", flexShrink: 0 }}>
        <path d="M60 20 C50 5 30 2 20 10 C10 18 12 32 22 35 C32 38 42 28 60 20 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M60 20 C70 5 90 2 100 10 C110 18 108 32 98 35 C88 38 78 28 60 20 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="60" cy="20" r="2.5" fill="currentColor"/>
        <circle cx="22" cy="34" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="98" cy="34" r="1.5" fill="currentColor" opacity="0.6"/>
        <path d="M60 20 L60 4" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2"/>
        <path d="M55 8 C55 8 58 6 60 4 C62 6 65 8 65 8" stroke="currentColor" strokeWidth="0.8" fill="none"/>
      </svg>
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, var(--gold-mid))" }} />
    </div>
  );
}

/** Gold diamond divider */
function GoldDiamond() {
  return (
    <div className="flex items-center gap-3 my-6 w-full px-6">
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, var(--gold-mid))" }} />
      <svg width="8" height="8" viewBox="0 0 8 8" fill="var(--gold-mid)" aria-hidden>
        <rect x="1.5" y="1.5" width="5" height="5" transform="rotate(45 4 4)" />
      </svg>
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, var(--gold-mid))" }} />
    </div>
  );
}

export default function InvitationCard() {
  return (
    <section
      className="relative mx-auto my-16 max-w-[90vw] w-[480px] sm:my-24 animate-fade-in-up delay-100"
      style={{
        backgroundImage: "url('/images/2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f8f5f0",
        boxShadow: "0 20px 60px -10px rgba(58,52,46,0.18), 0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      {/* Outer gold border frame */}
      <div style={{ padding: "10px" }}>
        <div style={{ border: "1px solid rgba(193,162,107,0.5)", padding: "8px" }}>
          <div style={{ border: "1px solid rgba(193,162,107,0.25)", padding: "0" }}>

            {/* Inner content */}
            <div
              className="relative flex flex-col items-center px-8 py-16 text-center sm:px-14 sm:py-24"
              style={{ background: "rgba(255,252,248,0.78)" }}
            >
              {/* Corner flourishes */}
              <div className="absolute top-4 left-4 h-10 w-10 rounded-tl-lg border-t border-l" style={{ borderColor: "rgba(193,162,107,0.45)" }} />
              <div className="absolute top-4 right-4 h-10 w-10 rounded-tr-lg border-t border-r" style={{ borderColor: "rgba(193,162,107,0.45)" }} />
              <div className="absolute bottom-4 left-4 h-10 w-10 rounded-bl-lg border-b border-l" style={{ borderColor: "rgba(193,162,107,0.45)" }} />
              <div className="absolute bottom-4 right-4 h-10 w-10 rounded-br-lg border-b border-r" style={{ borderColor: "rgba(193,162,107,0.45)" }} />

              {/* Top label */}
              <p style={{
                fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase",
                color: "var(--muted-foreground)", fontFamily: "'Montserrat', sans-serif",
                marginBottom: "1.5rem", marginTop: "0.5rem",
              }}>
                Together with their families
              </p>

              {/* Couple names in Great Vibes */}
              <h1 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2.8rem, 8vw, 4.2rem)",
                color: "var(--foreground)",
                lineHeight: 1.1,
                margin: 0,
              }}>
                {WEDDING.bride}
                <span style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1rem, 3vw, 1.4rem)",
                  fontStyle: "italic",
                  color: "var(--primary)",
                  letterSpacing: "0.2em",
                  margin: "0.4rem 0",
                }}>
                  &amp;
                </span>
                {WEDDING.groom}
              </h1>

              <p style={{
                marginTop: "1.8rem", maxWidth: "260px", textAlign: "center",
                fontSize: "9px", fontWeight: 500, lineHeight: 2,
                letterSpacing: "0.3em", color: "var(--muted-foreground)",
                textTransform: "uppercase",
              }}>
                Request the honor of your presence<br />at their wedding celebration
              </p>

              <FloralDivider />

              {/* Date */}
              <div className="flex flex-col items-center gap-3">
                <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.35em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>— The Date —</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "var(--foreground)", letterSpacing: "0.08em", fontStyle: "italic" }}>
                  {WEDDING.dateLabel}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--primary)", letterSpacing: "0.1em" }}>
                  {WEDDING.timeLabel}
                </span>
              </div>

              <GoldDiamond />

              {/* Venue */}
              <div className="flex flex-col items-center gap-2">
                <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.35em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>— The Venue —</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "0.06em" }}>
                  {WEDDING.venue}
                </span>
                <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}>
                  {WEDDING.location}
                </span>
              </div>

              {/* Map link */}
              <a
                href={WEDDING.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-10 mb-2 inline-flex items-center gap-2 transition-all"
                style={{
                  borderBottom: "1px solid rgba(193,162,107,0.4)",
                  paddingBottom: "4px",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "rgba(193,162,107,0.4)")}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
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
