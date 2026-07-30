import protein from "@/assets/cat-protein.png";
import creatine from "@/assets/cat-creatine.png";
import gainer from "@/assets/cat-gainer.png";
import preworkout from "@/assets/cat-preworkout.png";
import bcaa from "@/assets/cat-bcaa.png";
import accessories from "@/assets/cat-accessories.png";
import { Reveal, SectionHeading } from "./reveal";
import { TiltCard } from "./magnetic";

const CATEGORIES = [
  { name: "Protein", img: protein, count: "128 products" },
  { name: "Creatine", img: creatine, count: "42 products" },
  { name: "Mass Gainer", img: gainer, count: "36 products" },
  { name: "Pre Workout", img: preworkout, count: "58 products" },
  { name: "BCAA", img: bcaa, count: "31 products" },
  { name: "Accessories", img: accessories, count: "94 products" },
];

export function Categories() {
  return (
    <section id="shop" className="relative section-pad px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Curated Selection"
          title="Featured Categories"
          sub="Every category hand-picked, lab verified and built for athletes who refuse to compromise."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.name} dir={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"} delay={(i % 3) * 0.1}>
              <TiltCard>
                <div className="relative overflow-hidden glass-card rounded-[1.75rem] p-8 transition-all duration-700 [transition-timing-function:var(--ease-lux)] group-hover:-translate-y-2 group-hover:border-primary/50 group-hover:shadow-[0_0_60px_-15px_color-mix(in_oklab,var(--primary)_70%,transparent)]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(400px circle at var(--mx) var(--my), color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
                    }}
                  />
                  <div className="relative flex h-56 items-center justify-center">
                    <img
                      src={c.img}
                      alt={`${c.name} supplements`}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="h-full w-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)] transition-transform duration-[1200ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-110"
                    />
                  </div>
                  <div className="relative mt-6 flex items-end justify-between">
                    <div>
                      <h3 className="display-title text-3xl">{c.name}</h3>
                      <p className="eyebrow mt-1 tracking-[0.2em]">{c.count}</p>
                    </div>
                    <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-primary opacity-0 transition-all duration-500 group-hover:opacity-100">
                      View →
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
