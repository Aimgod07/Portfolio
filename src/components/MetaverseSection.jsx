import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MetaverseSection.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Everything below is plain data — edit freely any time, including the
 * big background word, the two side taglines, and the stat pills.
 */
const CONTENT = {
  kicker: "01 / Where Ideas Meet Interfaces",
  bgWord: "CONNECT",
  headline: "Let's build something people actually enjoy using.",
  taglineLeft: {
    label: "OPEN TO WORK",
    text: "Available for freelance projects and full-time roles, remote or on-site.",
  },
  taglineRight: {
    label: "THE PROCESS",
    text: "Discover, design, build, ship — with clear communication at every step.",
  },
  primaryCta: "Start a Project",
  secondaryCta: "Download Résumé",
  stats: [
    { label: "PROJECTS SHIPPED", value: "+32" },
    { label: "HAPPY CLIENTS", value: "+18" },
    { label: "AVG. RESPONSE TIME", value: "<24h" },
  ],
};

export default function MetaverseSection({ content = CONTENT }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mv__word", {
        opacity: 0,
        scale: 0.9,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".mv__figure", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".mv__tagline", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
      });
      gsap.from(".mv__stat", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: { trigger: ".mv__statbar", start: "top 90%" },
      });
      gsap.to(".mv__figure", {
        y: -16,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [content]);

  return (
    <section id="connect" className="mv" ref={sectionRef}>
      <div className="mv__grid-lines" aria-hidden="true" />

      <span className="mv__kicker">{content.kicker}</span>

      <div className="mv__stage">
        <h2 className="mv__word">{content.bgWord}</h2>

        <div className="mv__figure-wrap">
          <svg className="mv__figure" viewBox="0 0 420 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mvBody" x1="0" y1="0" x2="420" y2="520" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2a1a12" />
                <stop offset="1" stopColor="#120c09" />
              </linearGradient>
              <linearGradient id="mvVisor" x1="60" y1="150" x2="360" y2="230" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#ffc46b" />
                <stop offset="0.5" stopColor="#ff7a2e" />
                <stop offset="1" stopColor="#c8431a" />
              </linearGradient>
            </defs>
            <path d="M60 520c0-90 40-150 150-150s150 60 150 150z" fill="url(#mvBody)" />
            <circle cx="210" cy="210" r="120" fill="url(#mvBody)" />
            <rect x="90" y="176" width="240" height="66" rx="33" fill="url(#mvVisor)" opacity="0.92" />
            <rect x="90" y="176" width="240" height="66" rx="33" stroke="#ffe3bf" strokeOpacity="0.5" strokeWidth="1.5" />
            <g stroke="#ffb35c" strokeWidth="2" strokeLinecap="round" opacity="0.8">
              <line x1="150" y1="100" x2="140" y2="46" />
              <line x1="270" y1="100" x2="280" y2="46" />
            </g>
            <circle cx="140" cy="40" r="7" fill="#ff9a4d" />
            <circle cx="280" cy="40" r="7" fill="#ff9a4d" />
            <g opacity="0.5" stroke="#ffb35c" strokeWidth="1">
              <line x1="20" y1="260" x2="70" y2="260" />
              <line x1="350" y1="260" x2="400" y2="260" />
              <line x1="20" y1="300" x2="55" y2="300" />
              <line x1="365" y1="300" x2="400" y2="300" />
            </g>
          </svg>
          <div className="mv__figure-glow" aria-hidden="true" />
        </div>
      </div>

      <div className="mv__taglines">
        <div className="mv__tagline mv__tagline--left">
          <span>{content.taglineLeft.label}</span>
          <p>{content.taglineLeft.text}</p>
        </div>
        <div className="mv__tagline mv__tagline--right">
          <span>{content.taglineRight.label}</span>
          <p>{content.taglineRight.text}</p>
        </div>
      </div>

      <div className="mv__actions">
        <a href="mailto:hello@alex.dev" className="mv__btn mv__btn--primary">
          {content.primaryCta}
        </a>
        <a href="#hero" data-scroll-to className="mv__btn mv__btn--ghost">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 4l12 8-12 8V4z" fill="currentColor" />
          </svg>
          {content.secondaryCta}
        </a>
      </div>

      <div className="mv__statbar">
        {content.stats.map((s) => (
          <div className="mv__stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
        <a href="#hero" data-scroll-to className="mv__statbar-arrow" aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <footer className="mv__footer">
        <span>© {new Date().getFullYear()} Alex Rivera. Built with React, GSAP &amp; Locomotive Scroll.</span>
      </footer>
    </section>
  );
}
