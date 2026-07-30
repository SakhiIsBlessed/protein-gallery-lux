import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "Brands", href: "#brands" },
  { label: "Goals", href: "#goals" },
  { label: "Offers", href: "#offers" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay: 3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4 sm:pt-6"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-5 transition-all duration-700 [transition-timing-function:var(--ease-lux)]",
          scrolled
            ? "scale-[0.97] border-white/10 bg-[oklch(0.13_0_0)]/80 py-2.5 shadow-[var(--shadow-soft)] backdrop-blur-2xl"
            : "border-transparent bg-white/[0.03] py-4 backdrop-blur-md",
        )}
      >
        <a href="#home" className="display-title text-2xl tracking-wide">
          Protein<span className="text-primary">Gallery</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group relative inline-block px-4 py-2 font-grotesk text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-all duration-500 hover:scale-105 hover:text-foreground hover:[text-shadow:0_0_18px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-right scale-x-0 bg-primary transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            aria-label="Cart"
            className="glass relative rounded-full p-3 transition-all duration-500 hover:scale-110 hover:border-primary/60 hover:glow-ring"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-primary-foreground">
              3
            </span>
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="glass rounded-full p-3 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute left-4 right-4 top-24 rounded-3xl p-6 lg:hidden"
        >
          <ul className="grid gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-grotesk text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-white/5 hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
