import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";

/** Thin ember progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left [background:var(--gradient-ember)] shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
    />
  );
}

/**
 * Scroll-linked translate. `speed` is the total travel in px across the
 * element's full journey through the viewport (negative = moves up faster).
 */
export function Parallax({
  children,
  speed = -80,
  className,
  scale = false,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-speed / 2, speed / 2]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.5 });
  const s = useTransform(scrollYProgress, [0, 0.5, 1], scale ? [1.08, 1, 1.08] : [1, 1, 1]);

  return (
    <motion.div ref={ref} style={{ y, scale: s }} className={className}>
      {children}
    </motion.div>
  );
}

/** Cinematic section shell: fades + lifts + de-blurs as it enters, sinks as it leaves. */
export function CinematicSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.85, 1], [0.15, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.85, 1], [0.97, 1, 1, 0.97]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/** Animated SVG divider — a drawn ember line with a travelling light node. */
export function EmberDivider({ flip = false }: { flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 40%"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const glowX = useTransform(scrollYProgress, [0, 1], ["8%", "92%"]);

  return (
    <div ref={ref} aria-hidden className="relative mx-auto w-full max-w-6xl px-6 py-16">
      <svg
        viewBox="0 0 1200 60"
        className={`h-[60px] w-full ${flip ? "scale-y-[-1]" : ""}`}
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`ed-${flip ? "b" : "a"}`} x1="0" x2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="35%" stopColor="var(--primary)" stopOpacity="0.9" />
            <stop offset="65%" stopColor="var(--gold)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 30 C 220 30, 300 6, 480 6 S 760 54, 940 54 S 1120 30, 1200 30"
          stroke={`url(#ed-${flip ? "b" : "a"})`}
          strokeWidth="1.5"
          style={{ pathLength: draw }}
        />
        <motion.path
          d="M0 30 H 1200"
          stroke="color-mix(in oklab, white 12%, transparent)"
          strokeWidth="0.75"
          strokeDasharray="2 10"
          style={{ pathLength: draw }}
        />
      </svg>
      <motion.span
        className="pointer-events-none absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_28px_8px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
        style={{ left: glowX }}
      />
    </div>
  );
}

/** Skews children slightly based on scroll velocity — the classic award-site trick. */
export function VelocitySkew({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const prev = useRef(0);
  const v = useMotionValue(0);
  const skew = useSpring(v, { stiffness: 200, damping: 32, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - prev.current;
    prev.current = latest;
    v.set(Math.max(-4, Math.min(4, delta * 0.06)));
  });

  return <motion.div style={{ skewY: skew as MotionValue<number> }}>{children}</motion.div>;
}
