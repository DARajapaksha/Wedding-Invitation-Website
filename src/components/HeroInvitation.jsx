import Countdown from './Countdown';

export default function HeroInvitation({ wedding, onScrollToRSVP }) {
  return (
    <section className="hero-section site-shell">
      <div className="hero-ornament hero-ornament-top" aria-hidden="true" />
      <p className="eyebrow">{wedding.greeting}</p>
      <p className="font-serif text-xl italic text-ink-muted">{wedding.intro}</p>

      <div className="hero-names">
        <h2 className="font-script text-7xl leading-none sm:text-9xl">{wedding.bride}</h2>
        <div className="ampersand">&amp;</div>
        <h2 className="font-script text-7xl leading-none sm:text-9xl">{wedding.groom}</h2>
      </div>

      <div className="hero-divider">
        <span />
        <i />
        <span />
      </div>

      <div className="date-display">
        <span className="date-weekday">{wedding.dateLabel.split(',')[0]}</span>
        <span className="date-day">{new Date(wedding.date).getDate()}</span>
        <span className="date-month">{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(wedding.date))}</span>
        <span className="date-time">{wedding.timeLabel}</span>
      </div>

      <Countdown target={wedding.date} />

      <div className="hero-actions">
        <button className="primary-button" type="button" onClick={onScrollToRSVP}>RSVP</button>
        <a className="secondary-button" href="#details">View details</a>
      </div>
    </section>
  );
}
