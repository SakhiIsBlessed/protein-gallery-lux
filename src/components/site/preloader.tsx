import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL = 3200;

function Word({
  text,
  from,
  accent,
  delay,
}: {
  text: string;
  from: number;
  accent?: boolean;
  delay: number;
}) {
  return (
    <span className="flex overflow-hidden">
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className={accent ? "inline-block text-primary" : "inline-block"}
          initial={{ x: from, y: "60%", opacity: 0, rotate: from > 0 ? 8 : -8 }}
          animate={{ x: 0, y: "0%", opacity: 1, rotate: 0 }}
          transition={{
            duration: 1.5,
            delay: delay + i * 0.045,
            ease: EASE,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / (TOTAL - 500), 1);
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timer = setTimeout(() => {
      setShow(false);
      onDone();
    }, TOTAL);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-[oklch(0.08_0_0)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "linear" }}
        >
          {/* cinematic curtains that split open on exit */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-y-0 w-1/2 bg-[oklch(0.08_0_0)]"
              style={{ left: i === 0 ? 0 : "50%" }}
              exit={{ x: i === 0 ? "-101%" : "101%" }}
              transition={{ duration: 1.15, ease: EASE }}
            />
          ))}

          <div className="pointer-events-none absolute inset-0 [background:var(--gradient-veil)] opacity-70" />

          <motion.div
            className="relative flex h-full flex-col items-center justify-center px-6"
            exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="relative">
              <h1 className="display-title flex flex-wrap items-baseline justify-center gap-x-5 text-6xl sm:text-8xl md:text-[9rem]">
                <Word text="Protein" from={-260} delay={0.15} />
                <Word text="Gallery" from={260} accent delay={0.35} />
              </h1>
              <motion.span
                aria-hidden
                className="absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-overlay"
                initial={{ x: "-160%" }}
                animate={{ x: "420%" }}
                transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
              />
            </div>

            <motion.div
              className="relative mt-8 h-[2px] w-[min(70vw,620px)] overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full [background:var(--gradient-ember)] shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_90%,transparent)]"
                animate={{ width: `${pct}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </motion.div>

            <div className="mt-6 flex w-[min(70vw,620px)] items-center justify-between">
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
              >
                Fuel Curated For Champions
              </motion.p>
              <span className="font-grotesk text-xs tabular-nums tracking-[0.3em] text-muted-foreground">
                {String(pct).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
