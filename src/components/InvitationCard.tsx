import { WEDDING } from "../config";

function CastleIcon() {
  return (
    <div className="my-10 flex justify-center">
      <svg
        width="160"
        height="115"
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary/90"
        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.05))" }}
      >
        {/* Base */}
        <rect x="20" y="110" width="120" height="4" fill="currentColor" />
        <rect x="30" y="105" width="100" height="5" fill="currentColor" />
        {/* Main Building */}
        <rect x="40" y="60" width="80" height="45" fill="currentColor" />
        {/* Door */}
        <path d="M70 105 L70 85 A 10 10 0 0 1 90 85 L90 105 Z" fill="white" />
        {/* Side Towers */}
        <rect x="35" y="45" width="15" height="60" fill="currentColor" />
        <rect x="110" y="45" width="15" height="60" fill="currentColor" />
        {/* Side Tower Roofs */}
        <path d="M30 45 L42.5 15 L55 45 Z" fill="currentColor" />
        <path d="M105 45 L117.5 15 L130 45 Z" fill="currentColor" />
        {/* Center Tower */}
        <rect x="65" y="35" width="30" height="70" fill="currentColor" />
        {/* Center Tower Roof */}
        <path d="M55 35 L80 0 L105 35 Z" fill="currentColor" />
        {/* Windows */}
        <rect x="75" y="45" width="10" height="15" rx="5" fill="white" />
        <rect x="40" y="60" width="5" height="12" rx="2.5" fill="white" />
        <rect x="115" y="60" width="5" height="12" rx="2.5" fill="white" />
        {/* Flags */}
        <path d="M80 0 L80 -10 L95 -5 L80 0 Z" fill="currentColor" />
        <path d="M42.5 15 L42.5 5 L52.5 10 L42.5 15 Z" fill="currentColor" />
        <path d="M117.5 15 L117.5 5 L127.5 10 L117.5 15 Z" fill="currentColor" />
        {/* Decorative Lines */}
        <line x1="25" y1="105" x2="30" y2="105" stroke="currentColor" strokeWidth="1" />
        <line x1="130" y1="105" x2="135" y2="105" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function InvitationCard() {
  return (
    <section className="relative mx-auto my-12 max-w-[90vw] w-[450px] bg-card p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] sm:my-20">
      {/* Outer wrapper for embossed effect */}
      <div className="relative h-full w-full border border-border/80 p-1.5">
        
        {/* Inner border with flourishes */}
        <div className="relative flex h-full w-full flex-col items-center border border-border/60 px-6 py-16 text-center sm:py-24">
          
          {/* Corner flourishes */}
          <div className="absolute top-3 left-3 h-8 w-8 rounded-tl-xl border-t border-l border-primary/40"></div>
          <div className="absolute top-3 right-3 h-8 w-8 rounded-tr-xl border-t border-r border-primary/40"></div>
          <div className="absolute bottom-3 left-3 h-8 w-8 rounded-bl-xl border-b border-l border-primary/40"></div>
          <div className="absolute bottom-3 right-3 h-8 w-8 rounded-br-xl border-b border-r border-primary/40"></div>
          
          <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
            {WEDDING.bride}
            <span className="mx-4 inline-block font-serif text-3xl italic text-primary">
              &
            </span>
            {WEDDING.groom}
          </h1>

          <p className="mt-8 max-w-[280px] text-[10px] font-medium leading-relaxed tracking-[0.3em] text-muted-foreground uppercase">
            Request the honor of your presence<br />at our wedding
          </p>

          <CastleIcon />

          <p className="font-serif text-2xl italic text-foreground">
            Welcome to our wedding
          </p>
          
          <div className="my-8 h-px w-12 bg-primary/40" />

          <div className="space-y-8">
            <div className="flex flex-col items-center gap-3">
              <span className="text-[9px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
                - TIME -
              </span>
              <span className="font-serif text-lg tracking-wide text-foreground">
                {WEDDING.year} {WEDDING.timeLabel}
              </span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <span className="text-[9px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
                - ADDRESS -
              </span>
              <span className="font-serif text-lg tracking-wide text-foreground">
                {WEDDING.venue}
              </span>
              <span className="text-[10px] tracking-wider text-muted-foreground/80">
                {WEDDING.location}
              </span>
            </div>
          </div>

          <a
            href={WEDDING.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-12 inline-block border-b border-primary/30 pb-1 text-[9px] font-medium tracking-[0.3em] text-primary transition-colors hover:border-primary hover:text-primary/80 uppercase"
          >
            View map
          </a>
        </div>
      </div>
    </section>
  );
}
