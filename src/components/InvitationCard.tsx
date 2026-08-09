import { WEDDING } from "../config";

function Divider() {
  return (
    <div className="my-6 flex items-center justify-center gap-3">
      <span className="h-px w-12 bg-primary/50" />
      <span className="text-primary">❧</span>
      <span className="h-px w-12 bg-primary/50" />
    </div>
  );
}

export default function InvitationCard() {
  return (
    <section className="flex flex-col items-center px-6 py-20 text-center">
      <p className="text-xs tracking-[0.35em] text-muted-foreground uppercase">
        We're getting married
      </p>

      <h1 className="mt-8 font-serif text-5xl leading-tight text-foreground sm:text-6xl">
        {WEDDING.groom}
        <span className="mx-3 block font-serif text-3xl italic text-primary sm:inline">
          &
        </span>
        {WEDDING.bride}
      </h1>

      <Divider />

      <div className="space-y-1">
        <p className="font-serif text-lg text-foreground">{WEDDING.dateLabel}</p>
        <p className="font-serif text-3xl text-primary">{WEDDING.year}</p>
        <p className="mt-2 text-sm tracking-wide text-muted-foreground">
          {WEDDING.timeLabel}
        </p>
      </div>

      <Divider />

      <div className="space-y-1">
        <p className="font-serif text-xl text-secondary-foreground">
          {WEDDING.venue}
        </p>
        <p className="text-sm tracking-wide text-muted-foreground">
          {WEDDING.location}
        </p>
        <a
          href={WEDDING.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block border-b border-primary/60 pb-0.5 text-xs tracking-[0.2em] text-primary uppercase transition-colors hover:border-primary hover:text-accent"
        >
          View map
        </a>
      </div>
    </section>
  );
}
