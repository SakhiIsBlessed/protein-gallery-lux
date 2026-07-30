import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import heroTub from "@/assets/hero-tub.png";
import { MagneticButton } from "./magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;
const WORDS = ["Fuel", "Your", "Performance"];

export function Hero({ ready }: { ready: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 190]), {
    stiffness: 90,
    damping: 26,
  });
  const artY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -140]), {
    stiffness: 90,
    damping: 26,
  });
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const blur = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(8px)"]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const on = (e: PointerEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 24,
        y: (e.clientY / window.innerHeight - 0.5) * -18,
      });
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);

  const base = ready ? 0.15 : 3.4;

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-32 pt-40"
    >
      <div className="pointer-events-none absolute inset-0 [background:var(--gradient-veil)]" />
      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
      />

      <motion.div
        style={{ opacity: fade, filter: blur }}
        className="relative mx-auto grid w-full max-w-7xl items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div style={{ y: copyY }} className="text-center lg:text-left">
          <motion.span
            className="eyebrow glass inline-block rounded-full px-4 py-2"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: base, ease: EASE }}
          >
            Premium Sports Nutrition
          </motion.span>

          <h1 className="display-title mt-8 text-[3.4rem] leading-[0.86] sm:text-8xl xl:text-[9rem]">
            {WORDS.map((w, i) => (
              <span key={w} className="block overflow-hidden py-[0.04em]">
                <motion.span
                  className={
                    i === 2
                      ? "text-ember inline-block"
                      : "inline-block"
                  }
                  initial={{ y: "115%", rotate: 4, opacity: 0 }}
                  animate={ready ? { y: "0%", rotate: 0, opacity: 1 } : {}}
                  transition={{ duration: 1.4, delay: base + 0.14 * i, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mt-9 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0"
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, delay: base + 0.55, ease: EASE }}
          >
            Premium supplements for athletes, bodybuilders and everyone chasing a
            higher standard — curated from the world's most trusted labs.
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
            className="mt-16 flex items-center justify-center gap-10 lg:justify-start"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: base + 1 }}
          >
            {[
              ["100%", "Lab Tested"],
              ["24H", "Dispatch"],
              ["50+", "Elite Brands"],
            ].map(([n, l]) => (
              <div key={l} data-cursor className="text-center lg:text-left">
                <p className="display-title text-3xl text-gold">{n}</p>
                <p className="eyebrow mt-1 tracking-[0.2em]">{l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[520px]"
          style={{ y: artY, scale: heroScale }}
          initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
          animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.6, delay: base + 0.3, ease: EASE }}
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_65%)] blur-3xl" />

          {/* orbital rings */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[105%] w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_6px_color-mix(in_oklab,var(--primary)_55%,transparent)]" />
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -bottom-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_18px_5px_color-mix(in_oklab,var(--gold)_45%,transparent)]" />
          </motion.div>

          <motion.div
            animate={{ rotateY: tilt.x, rotateX: tilt.y }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
            style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
            className="animate-floaty"
            data-cursor
          >
            <img
              src={heroTub}
              alt="Protein Gallery premium whey protein container"
              width={1024}
              height={1280}
              fetchPriority="high"
              className="w-full drop-shadow-[0_50px_80px_rgba(0,0,0,0.85)]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay [background:linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.35)_48%,transparent_62%)]"
            />
          </motion.div>

          <motion.div
            className="glass absolute -bottom-2 left-0 rounded-2xl px-5 py-3"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="font-grotesk text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Whey Isolate
            </p>
            <p className="display-title text-2xl text-primary">₹4,299</p>
          </motion.div>

          <motion.div
            className="glass absolute right-0 top-6 rounded-2xl px-5 py-3 text-center"
            animate={{ y: [0, 11, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <p className="display-title text-2xl text-gold">4.9</p>
            <p className="font-grotesk text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
              12k Reviews
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-8 flex justify-center"
        style={{ opacity: fade }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: base + 1.3, duration: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="eyebrow">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-x-0 h-5 bg-primary"
              animate={{ y: ["-100%", "260%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <ArrowDown className="h-4 w-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
