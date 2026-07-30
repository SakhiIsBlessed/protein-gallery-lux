import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./reveal";

const ITEMS = [
  {
    name: "Arjun Mehta",
    role: "Powerlifter · Mumbai",
    text: "The isolate mixes clean and the recovery is unreal. Protein Gallery is the only place I trust for authentic stock.",
  },
  {
    name: "Sara Kapoor",
    role: "CrossFit Coach · Bengaluru",
    text: "Packaging, delivery, product quality — everything feels considered. It genuinely feels like a luxury brand experience.",
  },
  {
    name: "Dev Malhotra",
    role: "Bodybuilder · Delhi",
    text: "Twelve weeks on their pre-workout and creatine stack. Strongest I have ever been in a cutting phase.",
  },
  {
    name: "Nikita Rao",
    role: "Marathon Runner · Pune",
    text: "Fast dispatch, lab reports on request, and a team that actually knows nutrition. Rare combination.",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ITEMS.length), 5200);
    return () => clearInterval(t);
  }, []);

  const item = ITEMS[i];

  return (
    <section className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Community" title="Words From Athletes" />

        <div className="relative mt-16 h-[340px] sm:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 50, rotate: 3, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, rotate: -3, filter: "blur(14px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="glass absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-[2rem] p-10 text-center"
            >
              <Quote className="h-8 w-8 text-primary/70" />
              <blockquote className="font-grotesk text-lg leading-relaxed sm:text-2xl">
                “{item.text}”
              </blockquote>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <motion.span
                    key={s}
                    initial={{ scale: 0, rotate: -60 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + s * 0.08, type: "spring", stiffness: 260, damping: 14 }}
                  >
                    <Star className="h-4 w-4 fill-gold text-gold" />
                  </motion.span>
                ))}
              </div>
              <figcaption className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 font-grotesk text-sm text-primary transition-transform duration-500 hover:scale-110">
                  {item.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <span className="text-left">
                  <span className="block font-grotesk text-sm">{item.name}</span>
                  <span className="eyebrow tracking-[0.2em]">{item.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {ITEMS.map((t, idx) => (
            <button
              key={t.name}
              aria-label={`Testimonial ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === i ? "w-10 bg-primary" : "w-4 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
