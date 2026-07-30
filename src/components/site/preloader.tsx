import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      onDone();
    }, 2900);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[oklch(0.09_0_0)]"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="relative px-6 text-center">
            <div className="relative overflow-hidden">
              <h1 className="display-title flex flex-wrap items-baseline justify-center gap-x-4 text-6xl sm:text-8xl md:text-9xl">
                <motion.span
                  initial={{ x: "-60vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.4, ease: EASE }}
                >
                  Protein
                </motion.span>
                <motion.span
                  className="text-primary"
                  initial={{ x: "60vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.4, ease: EASE }}
                >
                  Gallery
                </motion.span>
              </h1>
              <motion.span
                aria-hidden
                className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                initial={{ x: "-140%" }}
                animate={{ x: "260%" }}
                transition={{ duration: 1.3, delay: 1.35, ease: "easeInOut" }}
              />
            </div>

            <motion.div
              className="mx-auto mt-6 h-[3px] rounded-full [background:var(--gradient-ember)] glow-ring"
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ duration: 1.1, delay: 1.1, ease: EASE }}
            />

            <motion.p
              className="eyebrow mt-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.8, ease: EASE }}
            >
              Fuel Curated For Champions
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
