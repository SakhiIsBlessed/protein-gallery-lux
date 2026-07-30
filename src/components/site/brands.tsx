import { Reveal } from "./reveal";

const BRANDS = [
  "Optimum Nutrition",
  "MuscleBlaze",
  "Avvatar",
  "GNC",
  "Nutrabay",
  "MyProtein",
];

export function Brands() {
  const list = [...BRANDS, ...BRANDS];
  return (
    <section id="brands" className="relative overflow-hidden py-20">
      <Reveal dir="blur">
        <p className="eyebrow text-center">Trusted Worldwide</p>
      </Reveal>
      <div className="marquee-wrap relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
        <div className="animate-marquee flex w-max gap-16">
          {list.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="display-title cursor-pointer whitespace-nowrap text-4xl text-muted-foreground/50 transition-all duration-500 hover:scale-105 hover:text-primary hover:[text-shadow:0_0_30px_color-mix(in_oklab,var(--primary)_80%,transparent)] sm:text-6xl"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
