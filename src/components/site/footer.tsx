import { motion } from "motion/react";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { Reveal } from "./reveal";

const COLUMNS = [
  { title: "Shop", links: ["Protein", "Creatine", "Mass Gainer", "Pre Workout"] },
  { title: "Brands", links: ["Optimum Nutrition", "MuscleBlaze", "GNC", "MyProtein"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
];

const SOCIALS = [Instagram, Twitter, Youtube, Facebook];

export function Footer() {
  return (
    <footer className="relative px-6 pb-12 pt-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="h-px origin-left [background:linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_70%,transparent),transparent)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <Reveal dir="left">
            <a href="#home" className="display-title text-4xl">
              Protein<span className="text-primary">Gallery</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A curated house of performance nutrition. Authentic products, cinematic experience.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIALS.map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#contact"
                  aria-label="Social link"
                  whileHover={{ y: -8, scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 380, damping: 12 }}
                  className="glass rounded-full p-3 text-muted-foreground transition-colors duration-500 hover:border-primary/60 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </Reveal>

          {COLUMNS.map((col, ci) => (
            <Reveal key={col.title} dir="up" delay={0.08 * ci}>
              <h3 className="eyebrow">{col.title}</h3>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#shop"
                      className="inline-block text-sm text-muted-foreground transition-all duration-500 hover:-translate-y-1 hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Protein Gallery. All rights reserved.</p>
          <p className="font-grotesk uppercase tracking-[0.25em]">Fuel Your Performance</p>
        </div>
      </div>
    </footer>
  );
}
