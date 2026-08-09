import { useEffect, useState } from "react";
import Envelope from "./components/Envelope";
import InvitationCard from "./components/InvitationCard";
import RSVPForm from "./components/RSVPForm";
import AdminPanel from "./components/AdminPanel";
import { WEDDING } from "./config";

export default function App() {
  const [route, setRoute] = useState<string>(() => window.location.hash);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Lock scrolling behind the envelope intro until it finishes opening.
  useEffect(() => {
    if (route === "#/admin" || route === "#admin") return;
    document.body.style.overflow = revealed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [revealed, route]);

  const isAdmin = route === "#/admin" || route === "#admin";

  if (isAdmin) {
    return (
      <main className="min-h-screen bg-background">
        <AdminPanel
          onExit={() => {
            window.location.hash = "";
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {!revealed && <Envelope onOpened={() => setRevealed(true)} />}

      <div
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
          transition: "opacity 900ms ease 150ms, transform 900ms cubic-bezier(0.22,1,0.36,1) 150ms",
        }}
      >
        <InvitationCard />
        <RSVPForm />

      <footer className="border-t border-border px-6 py-10 text-center">
        <p className="font-serif text-lg text-secondary-foreground">
          {WEDDING.groom} <span className="text-primary">&</span> {WEDDING.bride}
        </p>
        <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {WEDDING.location} · {WEDDING.year}
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.hash = "#/admin";
          }}
          className="mt-6 text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase transition-colors hover:text-primary"
        >
          Admin
        </button>
      </footer>
      </div>
    </main>
  );
}
