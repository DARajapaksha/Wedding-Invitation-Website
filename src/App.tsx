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
        <CancelRSVP
          onExit={() => {
            window.location.hash = "";
          }}
        />
      </main>
    );
  }

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
    <main className="min-h-screen relative">
      {/* Background Video Layer */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="h-full w-full object-cover"
        >
          <source src="/images/aisle.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />
      </div>
      {/* 
        The Envelope component now handles the tall scroll space and sticky positioning internally. 
        It will fade itself out and become pointer-events-none when fully scrolled.
      */}
      <Envelope />

      {/* 
        Main content sits below the envelope container. 
        When the user scrolls past the envelope spacer, this content comes naturally into view.
      */}
      <div className="relative z-10 bg-transparent pt-24 pb-12">
        <InvitationCard />
        <VenueSection />
        <Itinerary />
        <RSVPForm />

        <footer className="mt-12 border-t border-border/50 bg-background/85 px-6 py-10 text-center backdrop-blur-md">
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
