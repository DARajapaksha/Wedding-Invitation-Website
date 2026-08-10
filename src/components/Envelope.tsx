import { useEffect, useRef, useState } from "react";
import { WEDDING } from "../config";

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}
function mapRange(val: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const mapped = outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  return clamp(mapped, Math.min(outMin, outMax), Math.max(outMin, outMax));
}

export default function Envelope() {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolledPx = -rect.top;
      const maxScroll = rect.height - window.innerHeight;
      let p = scrolledPx / maxScroll;
      targetProgress.current = clamp(p, 0, 1);
    };

    const tick = () => {
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;
      if (Math.abs(targetProgress.current - currentProgress.current) > 0.001) {
        setProgress(currentProgress.current);
      } else {
        setProgress(targetProgress.current);
        currentProgress.current = targetProgress.current;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    currentProgress.current = targetProgress.current;
    setProgress(targetProgress.current);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Stage 1 (0.0–0.15): seal pops off and disappears
  const sealOpacity = mapRange(progress, 0, 0.12, 1, 0);
  const sealTranslateZ = mapRange(progress, 0, 0.12, 0, 100);
  const sealScale = mapRange(progress, 0, 0.12, 1, 1.2);
  const instructionsOpacity = mapRange(progress, 0, 0.05, 1, 0);

  // Stage 2 (0.12–0.45): Flaps open
  const leftFlapRotateY = mapRange(progress, 0.12, 0.45, 0, -170);
  const rightFlapRotateY = mapRange(progress, 0.12, 0.45, 0, 170);
  const flapsZIndex = progress >= 0.28 ? 10 : 40;

  // Stage 3 (0.40–0.70): Letter rises
  const letterTranslateY = mapRange(progress, 0.40, 0.70, 0, -15);
  const letterScale = mapRange(progress, 0.40, 0.70, 1, 1.15);

  // Stage 4 (0.75–1.0): Envelope fades out
  const envelopeOpacity = mapRange(progress, 0.75, 1.0, 1, 0);
  const envelopeTranslateY = mapRange(progress, 0.75, 1.0, 0, -100);
  const wrapperOpacity = mapRange(progress, 0.85, 1.0, 1, 0);

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <section
        className="sticky top-0 z-50 flex h-screen flex-col items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d0a08 0%, #1a1008 50%, #0d0a08 100%)",
          opacity: wrapperOpacity,
          pointerEvents: progress >= 0.9 ? "none" : "auto",
          perspective: "1800px",
        }}
      >
        {/* Ambient candlelight glow — pulsing */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="animate-glow-pulse"
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%", height: "70%", borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(193,162,107,0.13) 0%, rgba(139,24,32,0.09) 40%, transparent 70%)",
            }}
          />
          {/* Subtle vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }} />
        </div>

        {/* Decorative monogram header */}
        <div
          className="mb-8 flex flex-col items-center gap-2"
          style={{ opacity: mapRange(progress, 0.05, 0.15, 1, 0) }}
        >
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(193,162,107,0.6))" }} />
            <span style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "1.5rem",
              color: "rgba(193,162,107,0.8)",
              lineHeight: 1,
            }}>
              {WEDDING.bride} &amp; {WEDDING.groom}
            </span>
            <div style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(193,162,107,0.6))" }} />
          </div>
          <span style={{ fontSize: "8px", letterSpacing: "0.4em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
            {WEDDING.year} · {WEDDING.location}
          </span>
        </div>

        {/* ── Envelope container ── */}
        <div
          style={{
            position: "relative",
            width: "88vw",
            maxWidth: "50vh",
            aspectRatio: "1 / 1.45",
            transformStyle: "preserve-3d",
            containerType: "inline-size",
          }}
        >
          {/* ── Envelope Back Panel ── */}
          <div
            style={{
              position: "absolute", inset: 0, zIndex: 10,
              background: "linear-gradient(145deg, #7a141b 0%, #5c0d14 60%, #4a0a10 100%)",
              borderRadius: 4,
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.95), 0 10px 30px -5px rgba(0,0,0,0.6), inset 0 1px 0 rgba(193,162,107,0.15)",
              transform: `translateY(${envelopeTranslateY}%)`,
              opacity: envelopeOpacity,
            }}
          >
            {/* Flower overlay: multiply blend on dark red → natural crimson-rose tones */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/1.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, mixBlendMode: "multiply", borderRadius: 4 }} />
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(193,162,107,0.04) 10px, rgba(193,162,107,0.04) 11px)" }} />
            <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 30px rgba(0,0,0,0.7)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.4) 100%)" }} />
          </div>

          {/* ── Letter card ── */}
          <div
            style={{
              position: "absolute",
              top: "3%", bottom: "3%", left: "4%", right: "4%",
              zIndex: 20,
              background: "linear-gradient(160deg, #fffdf8 0%, #faf6ee 100%)",
              borderRadius: 2,
              boxShadow: "0 6px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(193,162,107,0.12)",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "space-between",
              padding: "10cqi 6cqi",
              textAlign: "center",
              transform: `translateY(${envelopeTranslateY + letterTranslateY}%) scale(${letterScale})`,
              opacity: envelopeOpacity,
            }}
          >
            {/* Inner borders — layered */}
            <div style={{ position: "absolute", inset: "3.5cqi", border: "1px solid rgba(193,162,107,0.25)", borderRadius: 1 }} />
            <div style={{ position: "absolute", inset: "5cqi", border: "1px solid rgba(193,162,107,0.12)", borderRadius: 1 }} />
            {/* Corner ornament dots */}
            {["topLeft","topRight","bottomLeft","bottomRight"].map((pos) => (
              <div key={pos} style={{
                position: "absolute",
                top: pos.startsWith("top") ? "3.5cqi" : undefined,
                bottom: pos.startsWith("bottom") ? "3.5cqi" : undefined,
                left: pos.endsWith("Left") ? "3.5cqi" : undefined,
                right: pos.endsWith("Right") ? "3.5cqi" : undefined,
                width: "4px", height: "4px",
                background: "rgba(193,162,107,0.5)",
                borderRadius: "50%",
                transform: "translate(var(--ox,0),var(--oy,0))",
              }} />
            ))}

            {/* Top section */}
            <div className="flex flex-col items-center gap-2 mt-6">
              <span style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "5.5cqi",
                color: "#c1a26b",
                lineHeight: 1,
                textShadow: "0 1px 2px rgba(139,105,20,0.2)",
              }}>
                Welcome
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "70%" }}>
                <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, rgba(193,162,107,0.5))" }} />
                <svg width="6" height="6" viewBox="0 0 6 6" fill="#c1a26b" aria-hidden><rect x="1.5" y="1.5" width="3" height="3" transform="rotate(45 3 3)"/></svg>
                <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, rgba(193,162,107,0.5))" }} />
              </div>
            </div>

            {/* Names */}
            <div className="flex flex-col items-center">
              <p style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "11cqi",
                color: "#3a342e",
                lineHeight: 1.05,
                textShadow: "0 1px 2px rgba(0,0,0,0.06)",
              }}>
                {WEDDING.bride}
              </p>
              <span style={{ color: "#c1a26b", fontSize: "7cqi", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", lineHeight: 1 }}>&amp;</span>
              <p style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "11cqi",
                color: "#3a342e",
                lineHeight: 1.05,
              }}>
                {WEDDING.groom}
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "2.2cqi", color: "#948679", letterSpacing: "0.28em", textTransform: "uppercase", marginTop: "5cqi", lineHeight: 1.7 }}>
                Request the honor of <br />your presence
              </p>
            </div>

            {/* Date / location */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "5cqi", gap: "2cqi" }}>
              <div style={{ width: "40%", height: "0.5px", background: "linear-gradient(to right, transparent, rgba(193,162,107,0.4), transparent)" }} />
              <span style={{ fontSize: "2.5cqi", color: "#3a342e", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{WEDDING.year}</span>
              <span style={{ fontSize: "2.2cqi", color: "#c1a26b", letterSpacing: "0.08em", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>{WEDDING.location}</span>
            </div>
          </div>

          {/* ── Left Flap ── */}
          <div
            style={{
              position: "absolute", top: 0, bottom: 0, left: 0,
              width: "51.5%", zIndex: flapsZIndex + 1,
              transformOrigin: "left center", transformStyle: "preserve-3d",
              transform: `translateY(${envelopeTranslateY}%) rotateY(${leftFlapRotateY}deg)`,
              opacity: envelopeOpacity,
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              background: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(193,162,107,0.03) 10px, rgba(193,162,107,0.03) 11px), linear-gradient(to right, #9e1c25 0%, #7a141b 100%)",
              backfaceVisibility: "hidden",
              borderTopLeftRadius: 4, borderBottomLeftRadius: 4,
              boxShadow: "2px 0 12px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}>
              {/* Removed flower overlay from front face — keeps the dark red clean and rich */}
              <div style={{ position: "absolute", top: "4%", bottom: "4%", left: "6%", right: "2%", border: "1px solid rgba(193,162,107,0.35)", borderTopLeftRadius: "2px", borderBottomLeftRadius: "2px" }}>
                <div style={{ position: "absolute", top: "4px", bottom: "4px", left: "4px", right: "4px", border: "1px solid rgba(193,162,107,0.18)" }} />
              </div>
              <div style={{ position: "absolute", top: "4%", left: "6%", width: "3px", height: "3px", background: "#c1a26b", borderRadius: "50%", transform: "translate(-1.5px,-1.5px)", opacity: 0.8 }} />
              <div style={{ position: "absolute", bottom: "4%", left: "6%", width: "3px", height: "3px", background: "#c1a26b", borderRadius: "50%", transform: "translate(-1.5px,1.5px)", opacity: 0.8 }} />
              <FloralCorner style={{ position: "absolute", top: "4%", left: "6%", width: "32%", color: "rgba(212,185,130,0.75)", transform: "scaleY(-1)" }} />
              <FloralCorner style={{ position: "absolute", bottom: "4%", left: "6%", width: "32%", color: "rgba(212,185,130,0.75)" }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.15)" }} />
            </div>
            <div style={{
              position: "absolute", inset: 0,
              background: "#7a141b", backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderTopRightRadius: 4, borderBottomRightRadius: 4, overflow: "hidden",
            }}>
              {/* Bright, elegant light gold — smooth and luminous */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #d4af37 0%, #fbf5df 25%, #c1a26b 50%, #f6e8b6 75%, #b8943f 100%)" }} />
              {/* Floral artwork lightly printed on the gold */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/1.png')", backgroundSize: "cover", backgroundPosition: "center right", opacity: 0.25, mixBlendMode: "multiply", transform: "scaleX(-1)" }} />
              {/* Subtle shading for depth */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)" }} />
            </div>
          </div>

          {/* ── Right Flap ── */}
          <div
            style={{
              position: "absolute", top: 0, bottom: 0, right: 0,
              width: "50%", zIndex: flapsZIndex,
              transformOrigin: "right center", transformStyle: "preserve-3d",
              transform: `translateY(${envelopeTranslateY}%) rotateY(${rightFlapRotateY}deg)`,
              opacity: envelopeOpacity,
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              background: "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(193,162,107,0.03) 10px, rgba(193,162,107,0.03) 11px), linear-gradient(to left, #9e1c25 0%, #85161d 100%)",
              backfaceVisibility: "hidden",
              borderTopRightRadius: 4, borderBottomRightRadius: 4,
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)" }} />
              {/* Removed flower overlay from front face — keeps the dark red clean and rich */}
              <div style={{ position: "absolute", top: "4%", bottom: "4%", left: "2%", right: "6%", border: "1px solid rgba(193,162,107,0.35)", borderTopRightRadius: "2px", borderBottomRightRadius: "2px" }}>
                <div style={{ position: "absolute", top: "4px", bottom: "4px", left: "4px", right: "4px", border: "1px solid rgba(193,162,107,0.18)" }} />
              </div>
              <div style={{ position: "absolute", top: "4%", right: "6%", width: "3px", height: "3px", background: "#c1a26b", borderRadius: "50%", transform: "translate(1.5px,-1.5px)", opacity: 0.8 }} />
              <div style={{ position: "absolute", bottom: "4%", right: "6%", width: "3px", height: "3px", background: "#c1a26b", borderRadius: "50%", transform: "translate(1.5px,1.5px)", opacity: 0.8 }} />
              <FloralCorner style={{ position: "absolute", top: "4%", right: "6%", width: "32%", color: "rgba(212,185,130,0.75)", transform: "scale(-1,-1)" }} />
              <FloralCorner style={{ position: "absolute", bottom: "4%", right: "6%", width: "32%", color: "rgba(212,185,130,0.75)", transform: "scaleX(-1)" }} />
            </div>
            <div style={{
              position: "absolute", inset: 0,
              background: "#7a141b", backfaceVisibility: "hidden",
              transform: "rotateY(-180deg)",
              borderTopLeftRadius: 4, borderBottomLeftRadius: 4, overflow: "hidden",
            }}>
              {/* Bright, elegant light gold — matching left flap */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(-135deg, #d4af37 0%, #fbf5df 25%, #c1a26b 50%, #f6e8b6 75%, #b8943f 100%)" }} />
              {/* Floral artwork lightly printed on the gold */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/1.png')", backgroundSize: "cover", backgroundPosition: "center left", opacity: 0.25, mixBlendMode: "multiply" }} />
              {/* Subtle shading for depth */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)" }} />
            </div>
          </div>

          {/* ── Wax seal ── */}
          <div
            style={{
              position: "absolute", left: "50%", top: "50%", zIndex: 50,
              transformStyle: "preserve-3d",
              transform: `translateY(${envelopeTranslateY}%) translateX(-50%) translateY(-50%) translateZ(${sealTranslateZ}px) scale(${sealScale})`,
              opacity: sealOpacity,
            }}
          >
            <WaxSeal />
          </div>
        </div>

        {/* Scroll instruction */}
        <div
          className="mt-12 flex flex-col items-center gap-3"
          style={{ opacity: instructionsOpacity }}
        >
          <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif" }}>
            Scroll to open
          </span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            {[0, 120, 240].map((delay) => (
              <div key={delay} style={{
                width: "8px", height: "8px",
                border: "1px solid rgba(193,162,107,0.5)",
                borderTop: "none", borderLeft: "none",
                transform: "rotate(45deg)",
                animation: `chevronBounce 1.6s ease-in-out ${delay}ms infinite`,
              }} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function WaxSeal() {
  return (
    <div style={{
      width: "16cqi", height: "16cqi", borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, #ffe55c 0%, #d4af37 30%, #a67c00 65%, #594300 100%)",
      boxShadow: "0 10px 28px rgba(0,0,0,0.85), 0 4px 8px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.7), inset 0 -4px 10px rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Seal ring decorations */}
      <svg viewBox="0 0 60 60" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.5))" }} aria-hidden>
        <path d="M 30 2 C 43 1 59 13 58 29 C 57 45 46 59 30 58 C 14 57 2 46 2 30 C 2 14 16 3 30 2 Z" fill="none" stroke="rgba(255,220,100,0.55)" strokeWidth="1.5" />
        <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(100,70,0,0.35)" strokeWidth="2" />
        <circle cx="30" cy="30" r="21" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      </svg>
      {/* Monogram — sized relative to the seal circle itself */}
      <span style={{
        fontFamily: "'Great Vibes', cursive",
        fontSize: "3.2cqi",
        color: "#ffe55c",
        fontWeight: 400,
        letterSpacing: "-0.02em",
        textShadow: "-1px -1px 1px rgba(255,255,255,0.4), 1px 1px 2px rgba(80,60,0,0.9)",
        zIndex: 1,
        lineHeight: 1,
        maxWidth: "70%",
        textAlign: "center",
        display: "block",
      }}>
        {WEDDING.bride.charAt(0)}{WEDDING.groom.charAt(0)}
      </span>
    </div>
  );
}


function FloralCorner({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className} style={style}
      viewBox="0 0 140 140" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden
    >
      {/* Main curved stem */}
      <path d="M4,136 C20,110 45,85 75,60 C95,44 118,28 136,8" />

      {/* Rose blossom at tip */}
      <circle cx="130" cy="12" r="7" strokeWidth="1" />
      <path d="M123,12 C125,6 135,6 137,12 C135,18 125,18 123,12 Z" strokeWidth="0.8" />
      <path d="M126,7 C130,4 134,7 134,12 C131,10 129,10 126,7 Z" strokeWidth="0.8" />
      <path d="M126,17 C130,20 134,17 134,12 C131,14 129,14 126,17 Z" strokeWidth="0.8" />
      <circle cx="130" cy="12" r="2.5" fill="currentColor" strokeWidth="0" opacity="0.6" />

      {/* Bud mid-stem */}
      <path d="M96,40 C92,35 92,30 97,28 C102,30 102,35 98,40 Z" />
      <path d="M97,28 C97,25 97,22 97,20" />
      <path d="M93,32 C89,30 87,26 90,24" />
      <path d="M101,32 C105,30 107,26 104,24" />

      {/* Leaf pair 1 — lower */}
      <path d="M28,112 C18,100 22,88 34,90 C32,100 30,106 28,112 Z" />
      <path d="M34,105 C46,96 55,100 50,112 C44,108 39,107 34,105 Z" />

      {/* Leaf pair 2 — mid */}
      <path d="M55,82 C46,70 50,58 62,60 C60,70 58,76 55,82 Z" />
      <path d="M62,76 C74,67 83,71 78,83 C72,79 67,78 62,76 Z" />

      {/* Leaf pair 3 — upper */}
      <path d="M82,56 C73,44 77,32 89,34 C87,44 85,50 82,56 Z" />
      <path d="M89,50 C101,41 110,45 105,57 C99,53 94,52 89,50 Z" />

      {/* Small accent dots */}
      <circle cx="14" cy="128" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="22" cy="120" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="44" cy="94" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="110" cy="22" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="120" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
