import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portrait from '../assets/img/hero.png';
import art from '../assets/img/ai.jpg';
import dimension from '../assets/img/threejs.jpg';
import './EditorialHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialHero() {
  const scope = useRef(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.intro-copy > *', { y: 25, opacity: 0, stagger: 0.11, duration: 1, ease: 'power3.out' });
        gsap.from('.portrait-cutout', { y: 70, opacity: 0, duration: 1.3, ease: 'power3.out' });
        gsap.from('.hero-satellite', { opacity: 0, scale: 0.9, stagger: 0.12, duration: 1.2, delay: 0.3, ease: 'power3.out' });
        gsap.utils.toArray('.satellite-float').forEach((el, i) => {
          gsap.to(el, { y: i % 2 ? 9 : -9, duration: 3.5 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        });
        gsap.to('.portrait-parallax', { y: 45, ease: 'none', scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.creative-seal svg', { rotation: 360, duration: 70, repeat: -1, ease: 'none' });
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="editorial-hero" ref={scope} aria-labelledby="intro-heading">
      <div className="intro-copy">
        <p className="intro-eyebrow">INDEPENDENT DEVELOPER & CREATIVE THINKER</p>
        <h1 id="intro-heading">A curious mind.<br/><em>A different perspective.</em></h1>
        <p className="intro-description">I'm Deepanshu. I turn thoughtful ideas into<br className="desktop-break"/> expressive websites and digital experiences.</p>
        <div className="intro-actions">
          <a className="pill dark" href="#/projects">Explore my work <span aria-hidden="true">↗</span></a>
          <a className="pill intro-secondary" href="#/art"><span className="mini-star" aria-hidden="true">✳</span> The art room</a>
        </div>
      </div>

      <div className="creative-seal" aria-hidden="true">
        <svg viewBox="0 0 100 100"><defs><path id="seal-path" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"/></defs><text><textPath href="#seal-path">CODE WITH CARE · CREATE WITH CURIOSITY · </textPath></text></svg><span>✦</span>
      </div>
      <div className="hero-composition">
        <svg className="connecting-lines" viewBox="0 0 1100 470" preserveAspectRatio="none" aria-hidden="true"><path d="M135 35 C85 280 490 245 550 270 C710 330 1040 275 969 105"/><path className="faint-line" d="M315 270 C250 95 780 60 815 310"/></svg>
        <div className="portrait-parallax"><img className="portrait-cutout" src={portrait} alt="Deepanshu, creative developer" fetchPriority="high"/></div>

        <div className="hero-satellite idea-note"><div className="satellite-float"><span className="wave-icon" aria-hidden="true">ııΙıı</span><h2>Turning thoughts<br/>into experiences.</h2><p>Considered design.<br/>Thoughtful development.</p></div></div>
        <div className="hero-satellite craft-note"><div className="satellite-float"><div className="craft-icons" aria-hidden="true"><span>⌘</span><span>✳</span><span>↗</span></div><h2>A little logic.<br/>A lot of imagination.</h2><p>Built with purpose.<br/>Made to feel different.</p></div></div>
        <div className="hero-satellite orbit-card focus-card"><div className="satellite-float"><span className="card-icon green">⌘</span><div>Development<small>Thoughtful, inside and out.</small></div></div></div>
        <div className="hero-satellite orbit-card ideas-card"><div className="satellite-float"><span className="card-icon lilac">✧</span><div>Ideas<small>Always a new perspective.</small></div></div></div>
        <div className="hero-satellite orbit-card design-card"><div className="satellite-float"><span className="card-icon peach">▧</span><div>Design<small>Details make the difference.</small></div></div></div>
        <a href="#/art" className="hero-satellite visual-tile visual-left" aria-label="Explore digital artwork"><div className="satellite-float"><img src={art} alt=""/><span>VISUAL EXPLORATIONS ↗</span></div></a>
        <a href="#/projects" className="hero-satellite visual-tile visual-right" aria-label="Explore creative development projects"><div className="satellite-float"><img src={dimension} alt=""/><span>BEYOND THE SCREEN ↗</span></div></a>
        <div className="hero-margin-note availability"><span className="fine-rule"/><p>Open to ideas.<br/>Ready to collaborate.</p><span className="availability-label"><i/> LET'S MAKE SOMETHING</span></div>
        <div className="hero-margin-note closing-note"><span aria-hidden="true">✦</span><p>Less ordinary.<br/>More possibility.</p></div>
      </div>
    </section>
  );
}
