import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Layered cursor: soft ember light + precise dot + reactive ring. */
export function CursorGlow() {
  const [fine, setFine] = useState(false);
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);

  const glowX = useSpring(x, { stiffness: 70, damping: 20, mass: 0.7 });
  const glowY = useSpring(y, { stiffness: 70, damping: 20, mass: 0.7 });
  const ringX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.35 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFine(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a, button, [data-cursor]")));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!fine) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 20%, transparent), transparent 62%)",
        }}
        animate={{ scale: active ? 1.25 : 1, opacity: active ? 1 : 0.8 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70"
        style={{ x: ringX, y: ringY, width: 38, height: 38 }}
        animate={{
          scale: down ? 0.7 : active ? 1.7 : 1,
          borderColor: active
            ? "color-mix(in oklab, var(--gold) 90%, transparent)"
            : "color-mix(in oklab, var(--primary) 70%, transparent)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ x, y }}
      />
    </>
  );
}

export function Atmosphere() {
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: (i * 37.6) % 100,
        top: (i * 61.3) % 100,
        size: 1 + ((i * 7) % 4),
        dur: 14 + ((i * 5) % 18),
        delay: (i % 9) * 1.3,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="lux-grid absolute inset-0 opacity-[0.35]" />
      <div className="animate-aurora absolute -left-1/4 top-[-20%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_65%)] blur-3xl" />
      <div
        className="animate-aurora absolute -right-1/4 top-[35%] h-[65vh] w-[60vw] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_11%,transparent),transparent_65%)] blur-3xl"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="animate-aurora absolute left-[20%] bottom-[-25%] h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_65%)] blur-3xl"
        style={{ animationDelay: "-16s" }}
      />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -90, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_45%,oklch(0_0_0/0.75)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
