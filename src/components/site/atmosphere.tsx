import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

export function CursorGlow() {
  const [p, setP] = useState({ x: -300, y: -300 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFine(true);
    const on = (e: PointerEvent) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);

  if (!fine) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[70] h-[420px] w-[420px] rounded-full mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 65%)",
        left: 0,
        top: 0,
      }}
      animate={{ x: p.x - 210, y: p.y - 210 }}
      transition={{ type: "spring", stiffness: 90, damping: 20, mass: 0.6 }}
    />
  );
}

export function Atmosphere() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
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
      <div className="animate-aurora absolute -left-1/4 top-[-20%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_65%)] blur-3xl" />
      <div
        className="animate-aurora absolute -right-1/4 top-[35%] h-[65vh] w-[60vw] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_11%,transparent),transparent_65%)] blur-3xl"
        style={{ animationDelay: "-9s" }}
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
