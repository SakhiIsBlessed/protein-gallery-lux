import { Star } from "lucide-react";
import protein from "@/assets/cat-protein.png";
import creatine from "@/assets/cat-creatine.png";
import preworkout from "@/assets/cat-preworkout.png";
import bcaa from "@/assets/cat-bcaa.png";
import { Reveal, SectionHeading } from "./reveal";
import { MagneticButton, TiltCard } from "./magnetic";

const PRODUCTS = [
  { name: "Gold Whey Isolate", brand: "Optimum Nutrition", price: "₹4,299", old: "₹5,499", off: "22%", rating: 4.9, img: protein },
  { name: "Micronized Creatine", brand: "MuscleBlaze", price: "₹1,499", old: "₹1,999", off: "25%", rating: 4.8, img: creatine },
  { name: "Ignite Pre Workout", brand: "GNC", price: "₹2,899", old: "₹3,499", off: "17%", rating: 4.7, img: preworkout },
  { name: "Amino Recovery BCAA", brand: "MyProtein", price: "₹2,199", old: "₹2,899", off: "24%", rating: 4.9, img: bcaa },
];

export function BestSellers() {
  return (
    <section id="goals" className="relative section-pad px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Athlete Approved"
          title="Best Sellers"
          sub="The formulas our community reorders again and again."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} dir="mask" delay={i * 0.09}>
              <TiltCard intensity={7}>
                <article className="relative flex h-full flex-col overflow-hidden glass-card rounded-[1.75rem] transition-all duration-700 [transition-timing-function:var(--ease-lux)] group-hover:-translate-y-3 group-hover:border-primary/50 group-hover:shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--primary)_80%,transparent)]">
                  <div className="relative h-60 overflow-hidden bg-[oklch(0.13_0_0)]">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(320px circle at var(--mx) var(--my), color-mix(in oklab, var(--gold) 16%, transparent), transparent 60%)",
                      }}
                    />
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="h-full w-full object-contain p-8 transition-transform duration-[1400ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-115"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 font-grotesk text-[0.6rem] font-bold uppercase tracking-[0.15em] text-primary-foreground">
                      -{p.off}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 translate-y-6 opacity-0 transition-all duration-600 [transition-timing-function:var(--ease-lux)] group-hover:translate-y-0 group-hover:opacity-100">
                      <button className="glass w-full rounded-full py-2.5 font-grotesk text-[0.65rem] uppercase tracking-[0.2em] hover:border-primary/70">
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="eyebrow tracking-[0.25em]">{p.brand}</p>
                    <h3 className="font-grotesk text-lg font-medium leading-tight">{p.name}</h3>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className="h-3.5 w-3.5 fill-gold text-gold transition-transform duration-500"
                          style={{ transitionDelay: `${s * 60}ms` }}
                        />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">{p.rating}</span>
                    </div>
                    <div className="mt-auto flex items-baseline gap-3 pt-3">
                      <span className="display-title text-3xl transition-all duration-500 group-hover:text-primary group-hover:[text-shadow:0_0_22px_color-mix(in_oklab,var(--primary)_75%,transparent)]">
                        {p.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">{p.old}</span>
                    </div>
                    <MagneticButton className="mt-3 w-full px-4 py-3" strength={0.18}>
                      Add To Cart
                    </MagneticButton>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
