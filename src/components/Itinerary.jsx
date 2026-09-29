export default function Itinerary({ items }) {
  return (
    <section className="section-pad site-shell itinerary-section">
      <div className="section-heading">
        <p className="eyebrow">On the day</p>
        <h2 className="font-serif text-4xl sm:text-6xl">Order of celebration</h2>
      </div>
      <div className="itinerary-card paper-card">
        {items.map((item) => (
          <div className="itinerary-row" key={`${item.time}-${item.title}`}>
            <div className="itinerary-time">{item.time}</div>
            <div className="itinerary-divider" />
            <div>
              <h3 className="font-serif text-2xl">{item.title}</h3>
              <p className="text-ink-muted mt-1">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
