export default function EventSection({ wedding }) {
  return (
    <section id="details" className="section-pad site-shell">
      <div className="section-heading">
        <p className="eyebrow">The celebration</p>
        <h2 className="font-serif text-4xl sm:text-6xl">Join us for our day</h2>
        <p className="section-intro">We would love to share this beautiful moment with you.</p>
      </div>

      <div className="event-grid">
        <article className="paper-card event-card">
          <div className="card-icon">I</div>
          <p className="eyebrow">When</p>
          <h3 className="font-serif text-3xl">{wedding.dateLabel}</h3>
          <p className="mt-3 text-ink-muted">{wedding.timeLabel}</p>
        </article>

        <article className="paper-card event-card">
          <div className="card-icon">II</div>
          <p className="eyebrow">Where</p>
          <h3 className="font-serif text-3xl">{wedding.venue}</h3>
          <p className="mt-3 text-ink-muted">{wedding.address}</p>
          <a className="inline-link" href={wedding.mapsUrl} target="_blank" rel="noreferrer">Open map ↗</a>
        </article>
      </div>
    </section>
  );
}
