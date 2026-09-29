import { useCountdown } from '../hooks/useCountdown';

const units = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
];

export default function Countdown({ target, compact = false }) {
  const values = useCountdown(target);

  const progress = {
    days: (values.days % 30) / 30,
    hours: values.hours / 24,
    minutes: values.minutes / 60,
    seconds: values.seconds / 60,
  };

  if (values.totalSeconds === 0) {
    return <p className="font-serif italic text-lg text-gold">Today is the day. Let the celebration begin.</p>;
  }

  return (
    <div className={compact ? 'countdown countdown-compact' : 'countdown'} aria-label="Countdown to the wedding">
      {!compact && <p className="countdown-kicker">Counting down to forever</p>}
      <div className="countdown-grid">
        {units.map(([key, label]) => (
          <div className="countdown-unit" key={key}>
            <div className="countdown-ring" style={{ '--progress': progress[key] }}>
              <span className="countdown-digit">{String(values[key]).padStart(2, '0')}</span>
            </div>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
