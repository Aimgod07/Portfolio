import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProjectCarousel from "./components/ProjectCarousel.jsx";
import SkillsScroller from "./components/SkillsScroller.jsx";
import MetaverseSection from "./components/MetaverseSection.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.09,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      },
      initCustomTicker: (render) => gsap.ticker.add(render),
      destroyCustomTicker: (render) => gsap.ticker.remove(render),
    });

    locomotiveScroll.lenisInstance?.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    // Give the DOM a beat to lay out (fonts/images) then recalc triggers.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      locomotiveScroll.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectCarousel />
        <SkillsScroller />
        <MetaverseSection />
      </main>
    </>
  );
}
