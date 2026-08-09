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

  // Stage 1 (0.0 to 0.15): seal pops off and disappears
  const sealOpacity = mapRange(progress, 0, 0.12, 1, 0);
  const sealTranslateZ = mapRange(progress, 0, 0.12, 0, 100); // pops forward
  const sealScale = mapRange(progress, 0, 0.12, 1, 1.2);
  const instructionsOpacity = mapRange(progress, 0, 0.05, 1, 0);

  // Stage 2 (0.12 to 0.45): Left and Right Flaps open outward like doors
  const leftFlapRotateY = mapRange(progress, 0.12, 0.45, 0, -170);
  const rightFlapRotateY = mapRange(progress, 0.12, 0.45, 0, 170);
  
  // Flip z-index when they open so they fall behind the card
  const flapsZIndex = progress >= 0.28 ? 10 : 40;

  // Stage 3 (0.40 to 0.70): Letter scales up to be viewed clearly
  const letterTranslateY = mapRange(progress, 0.40, 0.70, 0, -15);
  const letterScale = mapRange(progress, 0.40, 0.70, 1, 1.15); 

  // Stage 4 (0.75 to 1.0): Entire envelope fades out and moves up to reveal real content
  const envelopeOpacity = mapRange(progress, 0.75, 1.0, 1, 0);
  const envelopeTranslateY = mapRange(progress, 0.75, 1.0, 0, -100);
  const wrapperOpacity = mapRange(progress, 0.85, 1.0, 1, 0);

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <section
        className="sticky top-0 z-50 flex h-screen flex-col items-center justify-center overflow-hidden"
        style={{
          background: "#111",
          opacity: wrapperOpacity,
          pointerEvents: progress >= 0.9 ? "none" : "auto",
          perspective: "1800px",
        }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: "120%", height: "120%", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,24,32,0.12) 0%, transparent 60%)",
            }}
          />
        </div>

        <p
          className="mb-8 font-serif text-[11px] tracking-[0.4em] text-white/50 uppercase"
          style={{ opacity: mapRange(progress, 0.05, 0.15, 1, 0) }}
        >
          {WEDDING.groom.charAt(0)} & {WEDDING.bride.charAt(0)}
        </p>

        <div
          style={{
            position: "relative",
            width: "88vw",
            maxWidth: "50vh",
            aspectRatio: "1 / 1.45", // Vertical portrait orientation
            transformStyle: "preserve-3d",
            containerType: "inline-size",
          }}
        >
          {/* ── Envelope Back Panel (Behind the card) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              background: "#6a1015",
              borderRadius: 3,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.9), 0 10px 25px -5px rgba(0,0,0,0.5)",
              transform: `translateY(${envelopeTranslateY}%)`,
              opacity: envelopeOpacity,
            }}
          >
            {/* Inner shadows for depth */}
            <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%)" }} />
          </div>

          {/* ── Letter card (Inside the gatefold) ── */}
          <div
            style={{
              position: "absolute",
              top: "3%", bottom: "3%", left: "4%", right: "4%",
              zIndex: 20,
              background: "#ffffff",
              borderRadius: 2,
              boxShadow: "0 4px 25px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10cqi 6cqi",
              textAlign: "center",
              transform: `translateY(${envelopeTranslateY + letterTranslateY}%) scale(${letterScale})`,
              opacity: envelopeOpacity,
            }}
          >
            {/* Elegant inner embossed border */}
            <div style={{ position: "absolute", inset: "4cqi", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 1 }} />
            <div style={{ position: "absolute", inset: "5cqi", border: "1px solid rgba(0,0,0,0.04)", borderRadius: 1 }} />
            
            <div className="flex flex-col items-center gap-2 mt-4">
              <svg style={{ width: "10cqi", height: "10cqi", color: "#d4af37" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.8l5 5V18h-2v-4H9v4H7V9.8l5-5z" />
              </svg>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "4cqi", color: "#666", fontStyle: "italic", marginTop: "2cqi" }}>
                Welcome to our wedding
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "9cqi", color: "#222", lineHeight: 1.1 }}>
                {WEDDING.groom} <br/>
                <span style={{ color: "#d4af37", fontSize: "7cqi", fontStyle: "italic" }}>&</span> <br/>
                {WEDDING.bride}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "2.5cqi", color: "#888", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: "6cqi", lineHeight: 1.6 }}>
                Request the honor of <br/> your presence
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4cqi" }}>
              <span style={{ fontSize: "2.8cqi", color: "#222", letterSpacing: "0.15em", textTransform: "uppercase" }}>{WEDDING.year}</span>
              <span style={{ fontSize: "2.5cqi", color: "#d4af37", marginTop: "1cqi", letterSpacing: "0.1em" }}>{WEDDING.location}</span>
            </div>
          </div>

          {/* ── Left Flap (Gatefold) ── */}
          <div
            style={{
              position: "absolute",
              top: 0, bottom: 0, left: 0,
              width: "51.5%", // Slightly more than half to overlap cleanly
              zIndex: flapsZIndex + 1, // Left flap sits slightly on top of right flap when closed
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              transform: `translateY(${envelopeTranslateY}%) rotateY(${leftFlapRotateY}deg)`,
              opacity: envelopeOpacity,
            }}
          >
            {/* Front Face (Red exterior) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, #9e1c25 0%, #7a141b 100%)",
                backfaceVisibility: "hidden",
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3,
                boxShadow: "2px 0 10px rgba(0,0,0,0.4)", // Shadow cast onto the right flap
              }}
            >
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.2)" }} />
            </div>
            
            {/* Back Face (Inner Gold Liner) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#7a141b", // Base paper
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3,
                overflow: "hidden"
              }}
            >
              {/* Inner Liner */}
              <div style={{ position: "absolute", inset: "2%", right: 0, background: "linear-gradient(135deg, #b8860b, #ffd700, #daa520)" }} />
              {/* Inner shading */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />
            </div>
          </div>

          {/* ── Right Flap (Gatefold) ── */}
          <div
            style={{
              position: "absolute",
              top: 0, bottom: 0, right: 0,
              width: "50%",
              zIndex: flapsZIndex,
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
              transform: `translateY(${envelopeTranslateY}%) rotateY(${rightFlapRotateY}deg)`,
              opacity: envelopeOpacity,
            }}
          >
            {/* Front Face (Red exterior) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to left, #9e1c25 0%, #85161d 100%)",
                backfaceVisibility: "hidden",
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3,
              }}
            >
               <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} /> {/* Slightly darker as it sits underneath */}
            </div>
            
            {/* Back Face (Inner Gold Liner) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#7a141b", // Base paper
                backfaceVisibility: "hidden",
                transform: "rotateY(-180deg)",
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3,
                overflow: "hidden"
              }}
            >
              {/* Inner Liner */}
              <div style={{ position: "absolute", inset: "2%", left: 0, background: "linear-gradient(-135deg, #b8860b, #ffd700, #daa520)" }} />
              {/* Inner shading */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />
            </div>
          </div>

          {/* ── Wax seal (Centered over flaps) ── */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              zIndex: 50,
              transformStyle: "preserve-3d",
              transform: `translateY(${envelopeTranslateY}%) translateX(-50%) translateY(-50%) translateZ(${sealTranslateZ}px) scale(${sealScale})`,
              opacity: sealOpacity,
            }}
          >
            <WaxSeal />
          </div>
        </div>

        <div
          className="mt-10 flex flex-col items-center gap-2"
          style={{ opacity: instructionsOpacity }}
        >
          <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">Scroll to open</span>
          <span className="mt-1 h-6 w-px animate-bounce bg-white/30" />
        </div>
      </section>
    </div>
  );
}

function WaxSeal() {
  return (
    <div
      style={{
        width: "16cqi",
        height: "16cqi",
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #ffe55c 0%, #d4af37 30%, #a67c00 70%, #594300 100%)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -4px 8px rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 60 60"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.5))" }}
        aria-hidden
      >
        <path
           d="M 30 2 C 43 1 59 13 58 29 C 57 45 46 59 30 58 C 14 57 2 46 2 30 C 2 14 16 3 30 2 Z"
           fill="none" stroke="rgba(255,220,100,0.6)" strokeWidth="1.5"
        />
        <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(100,70,0,0.4)" strokeWidth="2" style={{ mixBlendMode: "multiply" }} />
        <circle cx="30" cy="30" r="21" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </svg>
      {/* Stamped Monogram */}
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "6cqi",
          color: "#ffe55c", // Bright gold highlight
          fontWeight: 700,
          textShadow: "-1px -1px 1px rgba(255,255,255,0.4), 1px 1px 2px rgba(80,60,0,0.9)",
          zIndex: 1,
        }}
      >
        {WEDDING.groom.charAt(0)}{WEDDING.bride.charAt(0)}
      </span>
    </div>
  );
}
