import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./reveal";
import { MagneticButton } from "./magnetic";

function useCountdown(hours: number) {
  const [left, setLeft] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  return {
    h: String(Math.floor(left / 3600)).padStart(2, "0"),
    m: String(Math.floor((left % 3600) / 60)).padStart(2, "0"),
    s: String(left % 60).padStart(2, "0"),
  };
}

export function SpecialOffer() {
  const { h, m, s } = useCountdown(23);

  return (
    <section id="offers" className="relative px-6 py-20">
      <Reveal dir="scale">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-primary/25 p-10 sm:p-16">
          <div className="absolute inset-0 -z-10 [background:var(--gradient-ember)] opacity-90" />
          <motion.div
            aria-hidden
            className="absolute inset-y-0 -z-10 w-1/3 -skew-x-12 bg-white/20 blur-2xl"
            animate={{ x: ["-40%", "320%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="flex flex-col items-center gap-10 text-center text-[oklch(0.12_0_0)] lg:flex-row lg:justify-between lg:text-left">
            <div>
              <p className="font-grotesk text-[0.7rem] uppercase tracking-[0.35em] opacity-70">
                Limited Drop
              </p>
              <h2 className="display-title mt-4 text-5xl sm:text-7xl">
                Flat 30% Off
                <span className="block">Whey Collection</span>
              </h2>
              <p className="mt-4 max-w-md font-grotesk text-sm opacity-80">
                Use code GALLERY30 at checkout. Ends when the timer hits zero.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-3">
                {[
                  [h, "Hrs"],
                  [m, "Min"],
                  [s, "Sec"],
                ].map(([v, l]) => (
                  <div
                    key={l}
                    className="flex h-24 w-20 flex-col items-center justify-center rounded-2xl bg-[oklch(0.12_0_0)]/85 text-foreground"
                  >
                    <span className="display-title text-4xl">{v}</span>
                    <span className="eyebrow mt-1 tracking-[0.2em]">{l}</span>
                  </div>
                ))}
              </div>
              <MagneticButton variant="ghost" className="border-[oklch(0.12_0_0)]/30 bg-[oklch(0.12_0_0)]/85">
                Claim Offer
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="contact" className="relative px-6 py-28">
      <Reveal dir="up">
        <div className="glass relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-0 [background:var(--gradient-veil)]" />
          <p className="eyebrow">Stay In The Loop</p>
          <h2 className="display-title mt-5 text-4xl sm:text-6xl">Join The Gallery</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Early access to drops, athlete guides and members-only pricing.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
            className="relative mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <div className="group relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-sm outline-none transition-all duration-500 placeholder:text-muted-foreground/60 focus:border-primary/70 focus:shadow-[var(--shadow-glow)]"
              />
            </div>
            <MagneticButton type="submit" strength={0.2}>
              {done ? "Subscribed" : "Subscribe"}
            </MagneticButton>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
