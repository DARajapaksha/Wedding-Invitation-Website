import { useEffect, useRef, useState } from 'react';

/* ── tiny easing helpers ─────────────────────────────────────── */
const ease = {
  outCubic:    (t) => 1 - (1 - t) ** 3,
  outBack:     (t) => { const c = 1.70158 + 1; return 1 + c * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2; },
  inOutCubic:  (t) => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2,
  outQuart:    (t) => 1 - (1 - t) ** 4,
};

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

/* ── WebGL background canvas ─────────────────────────────────── */
function initBg(canvas) {
  const W = canvas.width = window.innerWidth;
  const H = canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const STARS = Array.from({ length: 320 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.4 + 0.2,
    a: Math.random(),
    da: (Math.random() - 0.5) * 0.008,
  }));

  const PETALS = Array.from({ length: 28 }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: Math.random() * 0.55 + 0.2,
    r: Math.random() * 5 + 3,
    rot: Math.random() * Math.PI * 2,
    drot: (Math.random() - 0.5) * 0.025,
    hue: [340, 30, 20, 350, 355][i % 5],
    a: Math.random() * 0.45 + 0.15,
  }));

  const ORBS = Array.from({ length: 5 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 180 + 80,
    a: Math.random() * 0.12 + 0.04,
    dx: (Math.random() - 0.5) * 0.25,
    dy: (Math.random() - 0.5) * 0.15,
  }));

  let raf;
  function draw() {
    raf = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, W, H);

    // Deep background
    const bg = ctx.createLinearGradient(0, 0, W * 0.6, H);
    bg.addColorStop(0, '#0d0208');
    bg.addColorStop(0.45, '#200812');
    bg.addColorStop(1, '#130610');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Soft orbs
    for (const o of ORBS) {
      o.x += o.dx; o.y += o.dy;
      if (o.x < -o.r) o.x = W + o.r;
      if (o.x > W + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = H + o.r;
      if (o.y > H + o.r) o.y = -o.r;
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, `rgba(160,55,40,${o.a})`);
      g.addColorStop(0.5, `rgba(100,20,55,${o.a * 0.5})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill();
    }

    // Stars
    for (const s of STARS) {
      s.a = clamp(s.a + s.da, 0.05, 0.95);
      if (s.a <= 0.05 || s.a >= 0.95) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,240,210,${s.a})`;
      ctx.fill();
    }

    // Petals
    ctx.save();
    for (const p of PETALS) {
      p.x += p.vx + Math.sin(p.rot * 0.5) * 0.3;
      p.y += p.vy;
      p.rot += p.drot;
      if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 1.7, 0, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},70%,75%,${p.a})`;
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }
  draw();

  const onResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize);
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
}

/* ── Main component ──────────────────────────────────────────── */
export default function Envelope({ onOpen }) {
  const bgRef   = useRef(null);
  const sceneRef = useRef(null);
  const [state, setState] = useState('idle'); // idle → seal-pop → flap-open → letter-rise → burst → exit

  /* mouse tilt */
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const envelope3dRef = useRef(null);

  /* background canvas */
  useEffect(() => {
    if (!bgRef.current) return;
    return initBg(bgRef.current);
  }, []);

  /* smooth mouse tilt */
  useEffect(() => {
    if (state !== 'idle') return;
    const onMove = (e) => {
      mouse.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      mouse.current.x = lerp(mouse.current.x, mouse.current.tx, 0.06);
      mouse.current.y = lerp(mouse.current.y, mouse.current.ty, 0.06);
      if (envelope3dRef.current) {
        const rx = mouse.current.y * -16;
        const ry = mouse.current.x *  18;
        envelope3dRef.current.style.transform =
          `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, [state]);

  /* opening sequence */
  function open() {
    if (state !== 'idle') return;

    // Stage 1: tilt envelope forward + pop seal
    setState('seal-pop');
    setTimeout(() => setState('flap-open'),   350);
    setTimeout(() => setState('letter-rise'),  900);
    setTimeout(() => setState('burst'),       1300);
    setTimeout(() => setState('exit'),        2200);
    setTimeout(() => onOpen?.(),              3000);
  }

  const isOpen  = state !== 'idle';
  const flapOpen   = ['flap-open','letter-rise','burst','exit'].includes(state);
  const letterOut  = ['letter-rise','burst','exit'].includes(state);
  const doBurst    = ['burst','exit'].includes(state);
  const doExit     = state === 'exit';

  return (
    <section
      className="env-root"
      aria-label="Wedding invitation"
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && open()}
      style={{ cursor: isOpen ? 'default' : 'pointer' }}
    >
      {/* ── WebGL background ── */}
      <canvas ref={bgRef} className="env-bg-canvas" />

      {/* ── Heading ── */}
      <div className={`env-heading ${isOpen ? 'env-heading--gone' : ''}`}>
        <span className="env-eyebrow">A little invitation</span>
        <h1 className="env-title font-script">With love</h1>
        <p className="env-subtitle">Please open our invitation</p>
      </div>

      {/* ── 3D envelope scene ── */}
      <div
        ref={sceneRef}
        className={`env-scene ${isOpen ? 'env-scene--opening' : ''} ${doExit ? 'env-scene--exit' : ''}`}
      >
        {/* perspective wrapper */}
        <div className="env-persp">
          {/* tilt wrapper — mouse driven */}
          <div ref={envelope3dRef} className="env-tilt">

            {/* ══ THE ENVELOPE ══════════════════════════════ */}
            <div className={`env-body ${isOpen ? 'env-body--tilted' : ''}`}>

              {/* back face */}
              <div className="env-face env-back" />

              {/* letter card — inside, rises up when open */}
              <div className={`env-letter ${letterOut ? 'env-letter--risen' : ''}`}>
                <div className="env-letter-content">
                  <div className="env-letter-ornament">
                    <span /><i /><span />
                  </div>
                  <p className="font-script env-letter-script">You're invited</p>
                  <div className="env-letter-rule" />
                  <p className="env-letter-sub">to celebrate our love</p>
                  <div className="env-letter-ornament env-letter-ornament--bottom">
                    <span /><i /><span />
                  </div>
                </div>
              </div>

              {/* bottom V flap (front) */}
              <div className="env-face env-bottom-flap" />

              {/* left side flap */}
              <div className="env-face env-side-left" />

              {/* right side flap */}
              <div className="env-face env-side-right" />

              {/* ── top flap — hinged at top edge ── */}
              <div className={`env-flap-hinge ${flapOpen ? 'env-flap-hinge--open' : ''}`}>
                <div className="env-flap-face">
                  <div className="env-flap-shine" />
                </div>
              </div>

              {/* ── wax seal ── */}
              <div className={`env-seal ${state === 'seal-pop' || isOpen && !flapOpen ? 'env-seal--pop' : ''} ${flapOpen ? 'env-seal--gone' : ''}`}>
                <div className="env-seal-outer" />
                <div className="env-seal-disc">
                  <span className="env-seal-heart">♥</span>
                </div>
              </div>

              {/* glare overlay — follows mouse */}
              <div
                className="env-glare"
                style={{
                  background: `radial-gradient(circle at ${50 + mouse.current.x * 28}% ${50 + mouse.current.y * 28}%, rgba(255,255,255,0.18) 0%, transparent 68%)`,
                }}
              />

            </div>{/* /env-body */}

            {/* hover rings */}
            <div className={`env-ring env-ring-1 ${state !== 'idle' ? 'env-ring--hidden' : ''}`} />
            <div className={`env-ring env-ring-2 ${state !== 'idle' ? 'env-ring--hidden' : ''}`} />

          </div>{/* /env-tilt */}
        </div>{/* /env-persp */}

        {/* confetti burst */}
        {doBurst && <BurstParticles />}

      </div>{/* /env-scene */}

      {/* CTA */}
      <div className={`env-cta ${isOpen ? 'env-cta--gone' : ''}`}>
        <div className="env-cta-line" />
        <span>Click to open</span>
        <div className="env-cta-line" />
      </div>

    </section>
  );
}

/* ── Confetti burst ──────────────────────────────────────────── */
function BurstParticles() {
  const items = useRef(
    Array.from({ length: 70 }, (_, i) => {
      const angle  = Math.random() * Math.PI * 2;
      const speed  = 60 + Math.random() * 180;
      const colors = ['#bd9459','#e6cf9e','#c05070','#ff8fa8','#fff4e0','#a8743a','#f9c6d0'];
      return {
        id: i,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 120,
        rot: Math.random() * 720,
        color: colors[i % colors.length],
        size: Math.random() * 9 + 4,
        shape: ['circle','rect','heart'][i % 3],
        delay: Math.random() * 0.15,
      };
    })
  );
  return (
    <div className="env-burst">
      {items.current.map((p) => (
        <div
          key={p.id}
          className={`env-burst-p env-burst-p--${p.shape}`}
          style={{
            '--vx': `${p.vx}px`, '--vy': `${p.vy}px`, '--rot': `${p.rot}deg`,
            '--color': p.color, '--delay': `${p.delay}s`,
            width: p.size, height: p.size,
          }}
        />
      ))}
    </div>
  );
}
