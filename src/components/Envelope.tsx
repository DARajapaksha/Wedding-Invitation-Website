import { useEffect, useRef, useState } from "react";
import { WEDDING } from "../config";

export default function Envelope({ onOpened }: { onOpened: () => void }) {
  const [stage, setStage] = useState(0); // 0=closed 1=seal lifts 2=flap opens 3=letter rises 4=done
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.6) start();
      },
      { threshold: [0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function start() {
    if (started.current) return;
    started.current = true;
    setStage(1);
    setTimeout(() => setStage(2), 700);
    setTimeout(() => setStage(3), 1600);
    setTimeout(() => setStage(4), 2600);
    setTimeout(() => onOpened(), 3500);
  }

  const opened = stage >= 2;

  return (
    <section
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#1a1714",
        transition: "opacity 800ms ease",
        opacity: stage >= 4 ? 0 : 1,
        pointerEvents: stage >= 4 ? "none" : "auto",
        perspective: "1400px",
      }}
    >
      {/* Watercolor blotches */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          style={{
            position: "absolute", top: "8%", left: "-8%",
            width: "50%", height: "45%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(210,148,148,0.13) 0%, transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "5%", right: "-6%",
            width: "48%", height: "42%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,138,138,0.10) 0%, transparent 68%)",
          }}
        />
        {/* Gold dust */}
        <div style={{ position: "absolute", top: "19%", left: "19%", width: 4, height: 4, borderRadius: "50%", background: "rgba(200,170,70,0.65)" }} />
        <div style={{ position: "absolute", top: "22%", left: "24%", width: 2.5, height: 2.5, borderRadius: "50%", background: "rgba(200,170,70,0.45)" }} />
        <div style={{ position: "absolute", top: "17%", left: "17%", width: 2, height: 2, borderRadius: "50%", background: "rgba(200,170,70,0.35)" }} />
      </div>

      <p
        className="mb-10 font-serif text-xs tracking-[0.4em] text-white/50 uppercase"
        style={{ opacity: stage >= 1 ? 0 : 1, transition: "opacity 500ms ease" }}
      >
        Together with their families
      </p>

      <button
        type="button"
        onClick={start}
        aria-label="Open the invitation"
        style={{
          position: "relative",
          width: "min(88vw, 380px)",
          height: "min(60vw, 256px)",
          cursor: "pointer",
          outline: "none",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Letter card (rises from inside envelope) ── */}
        <div
          style={{
            position: "absolute",
            top: 8, bottom: 8, left: 10, right: 10,
            zIndex: 20,
            background: "#fdf8f0",
            border: "1px solid rgba(200,182,158,0.5)",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 20px",
            textAlign: "center",
            transformOrigin: "center 65%",
            transform: stage >= 4
              ? "translateY(-62%) scale(3.6)"
              : stage >= 3
              ? "translateY(-58%) scale(1)"
              : "translateY(3%) scale(1)",
            opacity: stage >= 4 ? 0 : stage >= 3 ? 1 : opened ? 0.7 : 0,
            transition: "transform 950ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease",
          }}
        >
          <div style={{ width: 30, height: 1, background: "rgba(180,140,100,0.5)", marginBottom: 10 }} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#5a4434", letterSpacing: "0.04em" }}>
            {WEDDING.groom} <span style={{ color: "#c96b52" }}>&</span> {WEDDING.bride}
          </p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 9, color: "#9a8068", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 7 }}>
            request the pleasure of your company
          </p>
          <div style={{ width: 30, height: 1, background: "rgba(180,140,100,0.5)", marginTop: 10 }} />
        </div>

        {/* ── Envelope body (cream vellum, semi-transparent) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            background: "rgba(246, 241, 228, 0.90)",
            borderRadius: 4,
            boxShadow: "0 24px 64px -20px rgba(0,0,0,0.85), 0 6px 18px -6px rgba(0,0,0,0.45)",
            overflow: "hidden",
            transformOrigin: "center bottom",
            transform: stage >= 4 ? "translateY(130%)" : "translateY(0)",
            opacity: stage >= 4 ? 0 : 1,
            transition: "transform 800ms cubic-bezier(0.5,0,0.75,0), opacity 600ms ease",
          }}
        >
          {/* Inset border */}
          <div
            style={{
              position: "absolute",
              top: 7, bottom: 7, left: 9, right: 9,
              border: "1px solid rgba(175,160,135,0.50)",
              borderRadius: 2,
              pointerEvents: "none",
            }}
          />
          {/* Invitation text visible through vellum */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "20px 28px",
              opacity: 0.28,
              pointerEvents: "none",
            }}
          >
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#4a3828", fontStyle: "italic", lineHeight: 1.2 }}>
              Invitation
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: "#6a5848", marginTop: 3 }}>
              come to our wedding
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: "#6a5848", marginTop: 8 }}>
              {WEDDING.groom}
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: "#6a5848", marginTop: 2 }}>
              {WEDDING.bride}
            </p>
          </div>
          {/* Bottom triangle fold shadow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(160,145,118,0.18), transparent 45%)",
              clipPath: "polygon(0 100%, 50% 45%, 100% 100%)",
              pointerEvents: "none",
            }}
          />
          {/* Side fold gradients */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(160,145,118,0.10) 0%, transparent 18%, transparent 82%, rgba(160,145,118,0.10) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── Flap — arch shape, rotates on top edge ── */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: "52%",
            zIndex: opened ? 10 : 40,
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            transform: opened ? "rotateX(-174deg)" : "rotateX(0deg)",
            transition: "transform 920ms cubic-bezier(0.55,0,0.2,1)",
          }}
        >
          {/* Front face */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            <svg
              viewBox="0 0 380 134"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%", display: "block" }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flapFront" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f3ede0" />
                  <stop offset="100%" stopColor="#e8e0cc" />
                </linearGradient>
              </defs>
              {/* Arch: flat top, curves down to a gentle point at bottom center */}
              <path d="M 0 0 L 380 0 L 380 100 Q 190 134 0 100 Z" fill="url(#flapFront)" />
              {/* Inner border echo */}
              <path
                d="M 9 7 L 371 7 L 371 94 Q 190 126 9 94 Z"
                fill="none"
                stroke="rgba(175,160,132,0.42)"
                strokeWidth="1"
              />
              {/* Shade at bottom curve */}
              <path d="M 0 88 Q 190 134 380 88 L 380 100 Q 190 134 0 100 Z" fill="rgba(155,138,110,0.14)" />
            </svg>
          </div>
          {/* Back face (shown when flap flips open) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #e8e0cc 0%, #dfd6be 100%)",
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          />
        </div>

        {/* ── Wax seal + baby's breath (centered at flap edge) ── */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "48%",
            zIndex: 50,
            transform: `translateX(-50%) translateY(-50%)${stage >= 1 ? " translateY(-40px) scale(1.06)" : ""}`,
            opacity: stage >= 1 ? 0 : 1,
            transition: "opacity 480ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <BabyBreath />
          <WaxSeal monogram={`${WEDDING.groom[0]}${WEDDING.bride[0]}`} />
        </div>
      </button>

      <div
        className="mt-12 flex flex-col items-center gap-2"
        style={{ opacity: stage >= 1 ? 0 : 1, transition: "opacity 500ms ease" }}
      >
        <span className="text-[11px] tracking-[0.32em] text-white/45 uppercase">Tap to open</span>
        <span className="mt-1 h-6 w-px animate-pulse bg-white/30" />
      </div>
    </section>
  );
}

function WaxSeal({ monogram }: { monogram: string }) {
  return (
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 36% 30%, #da8068 0%, #c05840 55%, #a84030 100%)",
        boxShadow:
          "0 5px 18px -4px rgba(0,0,0,0.55), inset 0 1.5px 3px rgba(255,200,175,0.55), inset 0 -2px 5px rgba(90,28,16,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        margin: "0 auto",
        marginTop: -4,
      }}
    >
      <svg
        viewBox="0 0 54 54"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        {/* Dashed outer ring */}
        <circle cx="27" cy="27" r="23.5" fill="none" stroke="rgba(255,210,185,0.38)" strokeWidth="1.2" strokeDasharray="3.5 2" />
        {/* Thin inner ring */}
        <circle cx="27" cy="27" r="19" fill="none" stroke="rgba(255,210,185,0.22)" strokeWidth="0.7" />
        {/* Crown outline */}
        <path
          d="M 18 33 L 18 28 L 21 25 L 24 29 L 27 22 L 30 29 L 33 25 L 36 28 L 36 33 Z"
          fill="none"
          stroke="rgba(255,215,190,0.58)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Base bar of crown */}
        <rect x="18" y="33" width="18" height="2.5" rx="1" fill="rgba(255,215,190,0.45)" />
        {/* Bottom scroll flourish */}
        <path
          d="M 16 38 Q 19 40 22 38 Q 25 36 27 38 Q 29 40 32 38 Q 35 36 38 38"
          fill="none"
          stroke="rgba(255,215,190,0.40)"
          strokeWidth="0.9"
        />
      </svg>
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 12,
          fontStyle: "italic",
          color: "rgba(255,228,210,0.92)",
          position: "relative",
          zIndex: 1,
          letterSpacing: "0.06em",
          lineHeight: 1,
        }}
      >
        {monogram}
      </span>
    </div>
  );
}

function BabyBreath() {
  const flowers: [number, number, number][] = [
    [28, 18, 2.4], [18, 28, 2], [24, 8, 2.2], [40, 6, 2.5], [50, 14, 2],
    [60, 5, 2.3], [72, 10, 2], [82, 18, 2.4], [90, 10, 2], [96, 22, 2.2],
    [14, 40, 1.8], [20, 36, 2], [36, 10, 1.8], [55, 22, 2], [75, 28, 2.2],
    [100, 32, 1.8], [12, 52, 1.6], [86, 4, 1.8], [105, 14, 1.7], [46, 28, 1.9],
    [64, 18, 1.8], [108, 42, 1.7], [33, 20, 1.7], [70, 35, 1.9],
  ];
  const fills = ["#e8e3f0", "#f0edf6", "#d4e2d0", "#ece8f4", "#f4f0f8"];

  return (
    <div style={{ position: "relative", width: 130, height: 72, marginLeft: -38, marginBottom: -10 }}>
      <svg
        viewBox="0 0 130 72"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        aria-hidden
      >
        {/* Main stems */}
        <line x1="64" y1="72" x2="28" y2="18" stroke="#556838" strokeWidth="1.1" opacity="0.82" />
        <line x1="64" y1="72" x2="48" y2="8" stroke="#556838" strokeWidth="1" opacity="0.75" />
        <line x1="64" y1="72" x2="64" y2="6" stroke="#556838" strokeWidth="1" opacity="0.72" />
        <line x1="64" y1="72" x2="82" y2="10" stroke="#556838" strokeWidth="1" opacity="0.75" />
        <line x1="64" y1="72" x2="96" y2="22" stroke="#556838" strokeWidth="1.1" opacity="0.82" />
        <line x1="64" y1="72" x2="108" y2="42" stroke="#556838" strokeWidth="1" opacity="0.72" />
        {/* Sub-branches */}
        <line x1="38" y1="42" x2="18" y2="28" stroke="#556838" strokeWidth="0.7" opacity="0.60" />
        <line x1="38" y1="42" x2="24" y2="40" stroke="#556838" strokeWidth="0.7" opacity="0.58" />
        <line x1="52" y1="32" x2="36" y2="10" stroke="#556838" strokeWidth="0.7" opacity="0.60" />
        <line x1="52" y1="32" x2="46" y2="28" stroke="#556838" strokeWidth="0.7" opacity="0.58" />
        <line x1="76" y1="34" x2="86" y2="18" stroke="#556838" strokeWidth="0.7" opacity="0.60" />
        <line x1="84" y1="40" x2="100" y2="32" stroke="#556838" strokeWidth="0.7" opacity="0.60" />
        <line x1="84" y1="40" x2="90" y2="10" stroke="#556838" strokeWidth="0.7" opacity="0.55" />
        {/* Flower dots */}
        {flowers.map(([x, y, r], i) => (
          <circle
            key={i}
            cx={x} cy={y} r={r}
            fill={fills[i % fills.length]}
            opacity={0.88}
          />
        ))}
      </svg>
    </div>
  );
}
