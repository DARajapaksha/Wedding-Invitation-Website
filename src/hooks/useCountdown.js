import { useEffect, useMemo, useState } from 'react';

function calculate(target) {
  const difference = Math.max(0, new Date(target).getTime() - Date.now());
  const totalSeconds = Math.floor(difference / 1000);
  return {
    totalSeconds,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => calculate(target, now), [target, now]);
}
