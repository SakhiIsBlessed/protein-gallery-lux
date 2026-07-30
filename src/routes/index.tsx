import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Preloader } from "@/components/site/preloader";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Categories } from "@/components/site/categories";
import { BestSellers } from "@/components/site/best-sellers";
import { Brands } from "@/components/site/brands";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { Newsletter, SpecialOffer } from "@/components/site/offer";
import { Footer } from "@/components/site/footer";
import { Atmosphere, CursorGlow } from "@/components/site/atmosphere";
import { CinematicSection, EmberDivider, ScrollProgress } from "@/components/site/parallax";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Protein Gallery — Premium Sports Nutrition & Supplements" },
      {
        name: "description",
        content:
          "Protein Gallery curates authentic whey, creatine, mass gainers and pre-workout from the world's elite supplement brands. Fuel your performance.",
      },
      { property: "og:title", content: "Protein Gallery — Premium Sports Nutrition & Supplements" },
      {
        property: "og:description",
        content:
          "Protein Gallery curates authentic whey, creatine, mass gainers and pre-workout from the world's elite supplement brands. Fuel your performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let lenis: { destroy: () => void } | undefined;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    import("lenis").then(({ default: Lenis }) => {
      const l = new Lenis({ duration: 1.5, smoothWheel: true, lerp: 0.085, wheelMultiplier: 0.95 });
      lenis = l;
      const loop = (t: number) => {
        l.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Atmosphere />
      <CursorGlow />
      <ScrollProgress />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero ready={ready} />
          <CinematicSection>
            <Categories />
          </CinematicSection>
          <EmberDivider />
          <CinematicSection>
            <BestSellers />
          </CinematicSection>
          <Brands />
          <EmberDivider flip />
          <CinematicSection>
            <Stats />
          </CinematicSection>
          <CinematicSection>
            <Testimonials />
          </CinematicSection>
          <EmberDivider />
          <CinematicSection>
            <SpecialOffer />
          </CinematicSection>
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
}
