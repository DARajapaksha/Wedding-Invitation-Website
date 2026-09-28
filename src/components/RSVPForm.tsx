import { useState, type FormEvent } from "react";
import { SHEET_URL, WHATSAPP_NUMBER, buildWhatsAppMessage } from "../config";
import Petals from "./Petals";

type Status = "idle" | "submitting" | "done" | "error";

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontSize: "9px",
  fontWeight: 500,
  letterSpacing: "0.25em",
  color: "var(--muted-foreground)",
  textTransform: "uppercase",
  fontFamily: "'Montserrat', sans-serif",
};

/** Inline floral header for the RSVP card */
function RSVPFloral() {
  return (
    <div className="flex flex-col items-center mb-2">
      <svg width="120" height="50" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M120 40 C95 15 55 8 30 22 C5 36 8 62 28 68 C48 74 75 55 120 40 Z" stroke="rgba(193,162,107,0.6)" strokeWidth="1.2" fill="rgba(193,162,107,0.06)"/>
        <path d="M120 40 C145 15 185 8 210 22 C235 36 232 62 212 68 C192 74 165 55 120 40 Z" stroke="rgba(193,162,107,0.6)" strokeWidth="1.2" fill="rgba(193,162,107,0.06)"/>
        <circle cx="120" cy="40" r="4" fill="rgba(193,162,107,0.8)"/>
        <circle cx="28" cy="68" r="2.5" fill="rgba(193,162,107,0.5)"/>
        <circle cx="212" cy="68" r="2.5" fill="rgba(193,162,107,0.5)"/>
        <path d="M120 40 L120 15" stroke="rgba(193,162,107,0.5)" strokeWidth="0.9" strokeDasharray="2,3"/>
        <path d="M113 20 C115 16 118 13 120 12 C122 13 125 16 127 20" stroke="rgba(193,162,107,0.5)" strokeWidth="0.9" fill="none"/>
        {/* Small leaf accents */}
        <path d="M55 52 C48 44 50 35 58 36 C56 44 56 48 55 52 Z" stroke="rgba(193,162,107,0.4)" strokeWidth="1" fill="none"/>
        <path d="M185 52 C192 44 190 35 182 36 C184 44 184 48 185 52 Z" stroke="rgba(193,162,107,0.4)" strokeWidth="1" fill="none"/>
      </svg>
    </div>
  );
}

export default function RSVPForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", whatsapp: "", mobile: "", attending: true, message: "" });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setStatus("submitting");

    const body = new URLSearchParams({
      action: "submit",
      name: form.name,
      whatsapp: form.whatsapp,
      mobile: form.mobile,
      attending: form.attending ? "Yes" : "No",
      message: form.message,
    });

    try {
      await fetch(SHEET_URL, { method: "POST", mode: "no-cors", body });
      setStatus("done");
      const text = encodeURIComponent(buildWhatsAppMessage(form.name));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section
        id="rsvp"
        className="relative px-6 py-28"
        style={{ backgroundImage: "url('/images/4.png')", backgroundSize: "cover", backgroundPosition: "center top" }}
      >
        <Petals burst />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(245,240,232,0.5), rgba(245,240,232,0.5))" }} />
        <div className="relative z-10 mx-auto max-w-md text-center animate-fade-in-up">
          <div
            className="glass-card rounded-2xl px-10 py-16"
            style={{ background: "rgba(255,253,248,0.92)" }}
          >
            <RSVPFloral />
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.5rem", color: "var(--primary)", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              Thank You
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "1rem auto", maxWidth: "120px" }}>
              <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, var(--gold-mid))" }} />
              <svg width="6" height="6" viewBox="0 0 6 6" fill="var(--gold-mid)" aria-hidden><rect x="1" y="1" width="4" height="4" transform="rotate(45 3 3)"/></svg>
              <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, var(--gold-mid))" }} />
            </div>
            <p style={{ fontWeight: 300, lineHeight: 1.9, color: "var(--muted-foreground)", letterSpacing: "0.02em", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.05rem" }}>
              Your RSVP has been received. We've opened WhatsApp so you can send your warm wishes — we can't wait to celebrate with you.
            </p>
            <button
              type="button"
              onClick={() => { setForm({ name: "", whatsapp: "", mobile: "", attending: true, message: "" }); setStatus("idle"); }}
              style={{
                marginTop: "2rem",
                fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase",
                color: "var(--primary)", background: "none", border: "none",
                cursor: "pointer", borderBottom: "1px solid rgba(193,162,107,0.4)", paddingBottom: "3px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Submit another response
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="relative px-6 py-28"
      style={{ backgroundImage: "url('/images/4.png')", backgroundSize: "cover", backgroundPosition: "center top" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(245,240,232,0.45)" }} />

      <div className="relative z-10 mx-auto max-w-md animate-fade-in-up delay-100">
        <div
          className="glass-card rounded-2xl p-8 sm:p-12"
          style={{ background: "rgba(255,253,248,0.92)" }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <RSVPFloral />
            <p style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
              Kindly Respond
            </p>
            <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.5rem", color: "var(--foreground)", lineHeight: 1.1, margin: 0 }}>
              RSVP
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "1rem auto 0", maxWidth: "120px" }}>
              <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, var(--gold-mid))" }} />
              <svg width="6" height="6" viewBox="0 0 6 6" fill="var(--gold-mid)" aria-hidden><rect x="1" y="1" width="4" height="4" transform="rotate(45 3 3)"/></svg>
              <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, var(--gold-mid))" }} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label style={labelStyle} htmlFor="rsvp-name">Full Name</label>
              <input
                id="rsvp-name"
                required
                className="elegant-input"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="rsvp-whatsapp">WhatsApp Number</label>
              <input
                id="rsvp-whatsapp"
                type="tel"
                inputMode="tel"
                className="elegant-input"
                placeholder="+94 77 123 4567"
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="rsvp-mobile">Mobile Number</label>
              <input
                id="rsvp-mobile"
                type="tel"
                inputMode="tel"
                className="elegant-input"
                placeholder="+94 71 987 6543"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value)}
              />
            </div>

            {/* Attending toggle */}
            <label
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                cursor: "pointer",
                background: "var(--cream)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "0.85rem 1.1rem",
                transition: "border-color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold-mid)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <input
                type="checkbox"
                style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                checked={form.attending}
                onChange={(e) => update("attending", e.target.checked)}
              />
              <span style={{ color: "var(--foreground)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1rem" }}>
                I will joyfully attend
              </span>
            </label>

            <div>
              <label style={labelStyle} htmlFor="rsvp-message">A Note for the Couple</label>
              <textarea
                id="rsvp-message"
                rows={4}
                className="elegant-input"
                style={{ resize: "none", display: "block" }}
                placeholder="Share your warm wishes…"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </div>

            {status === "error" && (
              <p style={{ fontSize: "13px", color: "var(--accent)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-gold w-full mt-2"
            >
              {status === "submitting" ? "Sending…" : "Send RSVP"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
