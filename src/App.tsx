import { useEffect, useState } from "react";
import Envelope from "./components/Envelope";
import InvitationCard from "./components/InvitationCard";
import VenueSection from "./components/VenueSection";
import Itinerary from "./components/Itinerary";
import RSVPForm from "./components/RSVPForm";
import AdminPanel from "./components/AdminPanel";
import CancelRSVP from "./components/CancelRSVP";
import { WEDDING } from "./config";

export default function App() {
  const [route, setRoute] = useState<string>(() => window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const isAdmin = route === "#/admin" || route === "#admin";
  const isCancel = route.startsWith("#/cancel");

  if (isCancel) {
    return (
      <main className="min-h-screen bg-background">
        <CancelRSVP onExit={() => { window.location.hash = ""; }} />
      </main>
    );
  }

  if (isAdmin) {
    return (
      <main className="min-h-screen bg-background">
        <AdminPanel onExit={() => { window.location.hash = ""; }} />
      </main>
    );
  }

  return (
    <main className="min-h-screen relative">
      {/* Gold accent strip — very top */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 100,
          background: "linear-gradient(90deg, transparent 0%, #8b6914 20%, #dfc06e 50%, #c1a26b 70%, transparent 100%)",
        }}
      />

      {/* Background Video Layer */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.92) saturate(0.9)" }}
        >
          <source src="/videos/aisle.webm" type="video/webm" />
        </video>
        {/* Dreamy multi-layer overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,5,3,0.28) 0%, rgba(15,8,5,0.18) 40%, rgba(10,5,3,0.22) 100%)" }} />
        <div className="absolute inset-0" style={{ backdropFilter: "blur(3px) saturate(120%)", WebkitBackdropFilter: "blur(3px) saturate(120%)" }} />
      </div>

      {/* Envelope scroll section */}
      <Envelope />

      {/* Main content */}
      <div className="relative z-10 bg-transparent pb-0">
        <InvitationCard />
        <VenueSection />
        <Itinerary />
        <RSVPForm />

        {/* Footer */}
        <footer
          style={{
            background: "rgba(255,252,247,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(193,162,107,0.2)",
            padding: "3rem 1.5rem",
            textAlign: "center",
          }}
        >
          {/* Gold rule */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "0 auto 1.5rem", maxWidth: "200px" }}>
            <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, rgba(193,162,107,0.6))" }} />
            <svg width="6" height="6" viewBox="0 0 6 6" fill="rgba(193,162,107,0.8)" aria-hidden><rect x="1" y="1" width="4" height="4" transform="rotate(45 3 3)"/></svg>
            <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, rgba(193,162,107,0.6))" }} />
          </div>

          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem", color: "var(--foreground)", lineHeight: 1.2, marginBottom: "0.5rem" }}>
            {WEDDING.bride} <span style={{ color: "var(--primary)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.3rem" }}>&amp;</span> {WEDDING.groom}
          </p>
          <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "1.5rem" }}>
            {WEDDING.location} · {WEDDING.year}
          </p>

          <button
            type="button"
            onClick={() => { window.location.hash = "#/admin"; }}
            style={{
              fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(148,134,121,0.45)", background: "none", border: "none",
              cursor: "pointer", transition: "color 0.25s",
              fontFamily: "'Montserrat', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(148,134,121,0.45)")}
          >
            Admin
          </button>
        </footer>
      </div>
    </main>
  );
}
