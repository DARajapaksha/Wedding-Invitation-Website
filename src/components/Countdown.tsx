import { useEffect, useRef, useState } from "react";
import { WEDDING } from "../config";

type CountdownValues = { days: number; hours: number; minutes: number; seconds: number };
const initial: CountdownValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };
function getRemaining(now: number): CountdownValues {
  const total = Math.max(0, new Date(WEDDING.dateISO).getTime() - now) / 1000;
  return { days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: Math.floor(total % 60) };
}
function Unit({ label, value, previous, fraction }: { label: string; value: number; previous: number; fraction: number }) {
  const changed = value !== previous;
  return <div className="countdown-unit" aria-hidden="true"><div className="countdown-ring" style={{ "--progress": `${fraction * 360}deg` } as React.CSSProperties}><span className={`countdown-digit ${changed ? "countdown-digit-changing" : ""}`}>{String(value).padStart(2, "0")}</span></div><span className="countdown-label">{label}</span></div>;
}
export default function Countdown({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState(() => Date.now());
  const previous = useRef(initial);
  const [reducedMotion, setReducedMotion] = useState(false);
  const target = new Date(WEDDING.dateISO).getTime();
  const values = getRemaining(now);
  const finished = now >= target;
  const inDay = finished && now < new Date(WEDDING.endISO).getTime();
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(query.matches);
    updateMotion(); query.addEventListener("change", updateMotion);
    let timer: number | undefined;
    const sync = () => { setNow(Date.now()); if (!document.hidden) timer = window.setTimeout(sync, 1000); };
    const onVisibility = () => { if (!document.hidden) sync(); else if (timer) window.clearTimeout(timer); };
    sync(); document.addEventListener("visibilitychange", onVisibility);
    return () => { if (timer) window.clearTimeout(timer); query.removeEventListener("change", updateMotion); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);
  useEffect(() => { previous.current = values; }, [values.days, values.hours, values.minutes, values.seconds]);
  const aria = finished ? (inDay ? "Today is the day" : "With love and gratitude") : `${values.days} days, ${values.hours} hours, ${values.minutes} minutes, and ${values.seconds} seconds until the wedding`;
  if (finished) return <div className={`countdown countdown-finished ${compact ? "countdown-compact" : ""}`} role="timer" aria-label={aria}><span>{inDay ? "Today is the day" : "With love and gratitude"}</span></div>;
  const units = [["Days", values.days, previous.current.days, Math.min(1, values.days / 365)], ["Hours", values.hours, previous.current.hours, values.hours / 24], ["Minutes", values.minutes, previous.current.minutes, values.minutes / 60], ["Seconds", values.seconds, previous.current.seconds, values.seconds / 60]] as const;
  return <div className={`countdown ${compact ? "countdown-compact" : ""} ${reducedMotion ? "countdown-reduced" : ""}`} role="timer" aria-label={aria}>{!compact && <p className="countdown-kicker">Until we say, “I do”</p>}<div className="countdown-grid">{units.map(([label, value, old, fraction]) => <Unit key={label} label={label} value={value} previous={old} fraction={fraction} />)}</div></div>;
}