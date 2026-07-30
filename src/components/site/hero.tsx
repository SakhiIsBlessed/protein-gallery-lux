import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import heroTub from "@/assets/hero-tub.png";
import { MagneticButton } from "./magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;
const WORDS = ["Fuel", "Your", "Performance"];

export function Hero({ ready }: { ready: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const on = (e: PointerEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 22,
        y: (e.clientY / window.innerHeight - 0.5) * -16,
      });
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);

  const base = ready ? 0.15 : 3;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-24 pt-36"
    >
      <div className="pointer-events-none absolute inset-0 [background:var(--gradient-veil)]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center lg:text-left">
          <motion.span
            className="eyebrow inline-block"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: base, ease: EASE }}
          >
            Premium Sports Nutrition
          </motion.span>

          <h1 className="display-title mt-6 text-[3.4rem] leading-[0.88] sm:text-8xl xl:text-[8.5rem]">
            {WORDS.map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span
                  className={i === 2 ? "inline-block text-primary" : "inline-block"}
                  initial={{ y: "110%" }}
                  animate={ready ? { y: "0%" } : {}}
                  transition={{ duration: 1.3, delay: base + 0.12 * i, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0"
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, delay: base + 0.55, ease: EASE }}
          >
            Premium supplements for athletes, bodybuilders, and fitness enthusiasts.
          </motion.p>

          <motion.div
            className="mt-11 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: base + 0.75, ease: EASE }}
          >
            <MagneticButton>Shop Now</MagneticButton>
            <MagneticButton variant="ghost" strength={0.2}>
              Explore Brands
            </MagneticButton>
          </motion.div>

          <motion.div
            className="mt-14 flex items-center justify-center gap-8 lg:justify-start"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: base + 1 }}
          >
            {[
              ["100%", "Lab Tested"],
              ["24H", "Dispatch"],
              ["50+", "Elite Brands"],
            ].map(([n, l]) => (
              <div key={l} className="text-center lg:text-left">
                <p className="display-title text-3xl text-gold">{n}</p>
                <p className="eyebrow mt-1 tracking-[0.2em]">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[520px]"
          initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
          animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.6, delay: base + 0.3, ease: EASE }}
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_65%)] blur-3xl" />
          <motion.div
            animate={{ rotateY: tilt.x, rotateX: tilt.y }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
            style={{ transformPerspective: 1200 }}
            className="animate-floaty"
          >
            <img
              src={heroTub}
              alt="Protein Gallery premium whey protein container"
              width={1024}
              height={1280}
              fetchPriority="high"
              className="w-full drop-shadow-[0_50px_80px_rgba(0,0,0,0.85)]"
            />
          </motion.div>
          <div className="glass absolute -bottom-2 left-0 rounded-2xl px-5 py-3">
            <p className="font-grotesk text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Whey Isolate
            </p>
            <p className="display-title text-2xl text-primary">₹4,299</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: base + 1.3, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="eyebrow">Scroll</span>
          <ArrowDown className="h-4 w-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
