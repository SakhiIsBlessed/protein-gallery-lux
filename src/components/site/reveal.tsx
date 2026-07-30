import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Dir = "up" | "left" | "right" | "scale" | "blur" | "rotate" | "mask";

const build = (dir: Dir): Variants => {
  const hidden: Record<string, unknown> = { opacity: 0 };
  if (dir === "up") hidden.y = 60;
  if (dir === "left") hidden.x = -70;
  if (dir === "right") hidden.x = 70;
  if (dir === "scale") hidden.scale = 0.86;
  if (dir === "blur") hidden.filter = "blur(18px)";
  if (dir === "rotate") {
    hidden.rotate = -6;
    hidden.y = 40;
  }
  if (dir === "mask") {
    hidden.y = 40;
    hidden.clipPath = "inset(100% 0% 0% 0%)";
  }
  const visible: Record<string, unknown> = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    clipPath: "inset(0% 0% 0% 0%)",
  };
  return { hidden, visible } as Variants;
};

export function Reveal({
  children,
  dir = "up",
  delay = 0,
  duration = 1.1,
  className,
}: {
  children: ReactNode;
  dir?: Dir;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={build(dir)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 1, delay: delay + i * 0.09, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}


export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"
      }
    >
      <Reveal dir="blur">
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <h2 className="display-title mt-5 text-5xl sm:text-6xl md:text-7xl">
        <StaggerText text={title} />
      </h2>
      {sub ? (
        <Reveal dir="up" delay={0.15}>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{sub}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
