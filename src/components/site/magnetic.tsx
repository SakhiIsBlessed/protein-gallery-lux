import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Ripple = { id: number; x: number; y: number };

export function MagneticButton({
  children,
  className,
  variant = "solid",
  onClick,
  strength = 0.35,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "ghost";
  onClick?: () => void;
  strength?: number;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const move = (e: MouseEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  const click = (e: MouseEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) {
      const id = Date.now();
      setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      setTimeout(() => setRipples((p) => p.filter((i) => i.id !== id)), 700);
    }
    onClick?.();
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={move}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onClick={click}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 16, mass: 0.5 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative isolate overflow-hidden rounded-full px-8 py-4 font-grotesk text-xs font-semibold uppercase tracking-[0.22em] transition-shadow duration-500",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:glow-ring"
          : "glass text-foreground hover:border-primary/60",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {variant === "solid" ? (
        <span className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 hover:opacity-100 [background:var(--gradient-ember)]" />
      ) : null}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute z-0 rounded-full bg-white/35"
          style={{ left: r.x, top: r.y }}
          initial={{ width: 0, height: 0, opacity: 0.6, x: "-50%", y: "-50%" }}
          animate={{ width: 420, height: 420, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
}

export function TiltCard({
  children,
  className,
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setT({
          rx: (0.5 - py) * intensity * 2,
          ry: (px - 0.5) * intensity * 2,
          mx: px * 100,
          my: py * 100,
        });
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0, mx: 50, my: 50 })}
      style={{
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transition: "transform 700ms var(--ease-lux)",
        ["--mx" as string]: `${t.mx}%`,
        ["--my" as string]: `${t.my}%`,
      }}
      className={cn("group relative transform-gpu will-change-transform", className)}
    >
      {children}
    </div>
  );
}
