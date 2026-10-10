import { useMemo } from 'react';

const PETAL_COUNT = 22;

export default function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: i,
        left: `${3 + ((i * 4.3) % 95)}%`,
        delay: `${(i * 0.61) % 9}s`,
        duration: `${13 + ((i * 1.3) % 8)}s`,
        size: `${7 + ((i * 1.1) % 7)}px`,
        heightMul: `${1.5 + ((i * 0.13) % 1.1)}`,
        rotX: `${(i * 37) % 360}deg`,
        rotY: `${(i * 53) % 360}deg`,
        color: i % 5 === 0
          ? 'rgba(255,200,210,0.72)'
          : i % 5 === 1
          ? 'rgba(239,220,190,0.66)'
          : i % 5 === 2
          ? 'rgba(189,148,89,0.50)'
          : i % 5 === 3
          ? 'rgba(240,160,180,0.60)'
          : 'rgba(255,240,245,0.55)',
        driftX: `${((i * 8) % 14) - 7}vw`,
        zIndex: i % 3,
      })),
    [],
  );

  return (
    <div className="petal-layer-3d" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal-3d"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--petal-w': p.size,
            '--petal-h': `${parseFloat(p.size) * parseFloat(p.heightMul)}px`,
            '--petal-color': p.color,
            '--drift-x': p.driftX,
            '--rot-x': p.rotX,
            '--rot-y': p.rotY,
            zIndex: p.zIndex,
          }}
        />
      ))}
    </div>
  );
}
