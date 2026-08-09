import { WEDDING } from "../config";

export default function VenueSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 px-6 py-24 text-center">
      {/* Decorative floral/botanical elements (faded out behind) */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-xl">
        <h2 className="mb-4 font-serif text-3xl font-light text-foreground md:text-4xl">
          When & Where
        </h2>
        <div className="mx-auto mb-10 h-px w-16 bg-primary/40" />

        <div className="space-y-10">
          {/* Date & Time */}
          <div className="space-y-3">
            <p className="font-serif text-xl tracking-wide text-primary md:text-2xl">
              {WEDDING.dateLabel}
            </p>
            <p className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
              {WEDDING.timeLabel}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <p className="font-serif text-2xl tracking-wide text-foreground md:text-3xl">
              {WEDDING.venue}
            </p>
            <p className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
              {WEDDING.location}
            </p>
          </div>

          {/* Map Link */}
          <div className="pt-6">
            <a
              href={WEDDING.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary/20 bg-white px-8 py-3 text-xs tracking-widest text-secondary-foreground uppercase transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              View on Map
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
