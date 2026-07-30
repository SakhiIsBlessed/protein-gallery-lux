import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Award, Boxes, Sparkles, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const STATS = [
  { icon: Users, value: 10000, suffix: "+", label: "Happy Customers" },
  { icon: Boxes, value: 500, suffix: "+", label: "Products" },
  { icon: Award, value: 50, suffix: "+", label: "Brands" },
  { icon: Sparkles, value: 99, suffix: "%", label: "Positive Reviews" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 2200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="display-title text-6xl sm:text-7xl">
      {n.toLocaleString()}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built On Trust"
          sub="Authenticity guaranteed on every scoop — sourced direct, verified in lab, shipped fast."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} dir="scale" delay={i * 0.1}>
              <div className="glass group relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-700 hover:border-primary/50">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary"
                >
                  <s.icon className="h-6 w-6" />
                </motion.div>
                <Counter to={s.value} suffix={s.suffix} />
                <p className="eyebrow mt-3 tracking-[0.25em]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
