const EVENTS = [
  {
    time: "8:30 AM",
    title: "Arrival of Guests",
    description: "Welcome drinks and gathering before the traditional ceremonies begin.",
  },
  {
    time: "9:30 AM",
    title: "Poruwa Ceremony",
    description: "The traditional Sinhalese wedding ceremony filled with ancient customs and rituals.",
  },
  {
    time: "10:30 AM",
    title: "Lighting of the Oil Lamp",
    description: "A symbol of hope, prosperity, and the start of our new life together.",
  },
  {
    time: "12:30 PM",
    title: "Wedding Feast & Dancing",
    description: "Join us for a grand lunch buffet and an afternoon of celebration and dancing.",
  },
];

export default function Itinerary() {
  return (
    <section
      className="relative px-6 py-28"
      style={{
        backgroundImage: "url('/images/3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      {/* Layered overlays (neutral, no red tint) */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.45) 100%)" }} />

      <div className="relative z-10 mx-auto max-w-2xl animate-fade-in-up delay-100">

        {/* Heading block */}
        <div className="mb-16 text-center">
          <p style={{ fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(225,210,170,0.7)", fontFamily: "'Montserrat', sans-serif", marginBottom: "0.75rem" }}>
            The Celebration
          </p>
          <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.5rem, 7vw, 4rem)", color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Order of Events
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "0 auto", maxWidth: "180px" }}>
            <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, rgba(193,162,107,0.8))" }} />
            <svg width="7" height="7" viewBox="0 0 7 7" fill="rgba(193,162,107,0.9)" aria-hidden><rect x="1" y="1" width="5" height="5" transform="rotate(45 3.5 3.5)"/></svg>
            <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, rgba(193,162,107,0.8))" }} />
          </div>
        </div>

        {/* Glass card */}
        <div className="rounded-2xl p-10 sm:p-14" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(212,185,130,0.4)", boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}>
          <div className="relative">
            {/* Elegant continuous vertical gold line — desktop only */}
            <div
              className="absolute top-2 bottom-2 hidden md:block"
              style={{
                left: "calc(50% - 0.5px)",
                width: "1px",
                background: "linear-gradient(to bottom, transparent, rgba(193,162,107,0.7) 15%, rgba(193,162,107,0.7) 85%, transparent)",
              }}
            />
            {/* Mobile vertical line */}
            <div
              className="absolute top-2 bottom-2 md:hidden"
              style={{
                left: "22px",
                width: "1px",
                background: "linear-gradient(to bottom, transparent, rgba(193,162,107,0.7) 15%, rgba(193,162,107,0.7) 85%, transparent)",
              }}
            />

            <div className="space-y-16">
              {EVENTS.map((event, idx) => (
                <div
                  key={event.title}
                  className={`relative flex items-start md:items-center gap-8 md:justify-between animate-fade-in-up ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                  style={{ animationDelay: `${idx * 150 + 100}ms` }}
                >
                  {/* Gold diamond dot — mobile only */}
                  <div
                    className="absolute md:hidden"
                    style={{
                      left: "18px",
                      top: "16px",
                      width: "9px", height: "9px",
                      background: "linear-gradient(135deg, #e8d4a0, #c4a55a)",
                      transform: "rotate(45deg)",
                      boxShadow: "0 0 10px rgba(193,162,107,0.6)",
                    }}
                  />
                  {/* Desktop diamond dot */}
                  <div
                    className="absolute hidden md:block"
                    style={{
                      left: "calc(50% - 4.5px)",
                      top: "50%",
                      width: "9px", height: "9px",
                      background: "linear-gradient(135deg, #e8d4a0, #c4a55a)",
                      transform: "translateY(-50%) rotate(45deg)",
                      boxShadow: "0 0 12px rgba(193,162,107,0.8)",
                    }}
                  />

                  {/* Desktop time */}
                  <div className={`hidden w-1/2 md:block md:w-[calc(50%-4rem)] ${idx % 2 === 0 ? "text-left" : "text-right"}`}>
                    <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.4rem", color: "#b38936", lineHeight: 1, textShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                      {event.time}
                    </p>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 pl-16 md:w-[calc(50%-4rem)] md:flex-none md:pl-0 ${
                      idx % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <p className="mb-2 md:hidden" style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem", color: "#b38936", lineHeight: 1 }}>
                      {event.time}
                    </p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", color: "#3a2a10", marginBottom: "0.5rem", fontWeight: 500, letterSpacing: "0.02em" }}>
                      {event.title}
                    </h3>
                    <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.7, letterSpacing: "0.03em", color: "#5c4b37" }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
