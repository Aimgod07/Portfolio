import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GamesPage.css';

gsap.registerPlugin(ScrollTrigger);

const games = [
  ['Sandal Spin Showdown', 'Party'],
  ['Inkblade Dojo', 'Fighting'],
  ['Courtside', 'Sports'],
  ['Featherfall', 'Puzzle'],
  ['First Touch', 'Sports'],
  ['Fruit Frenzy', 'Arcade'],
];

const systems = [
  ['01', 'Discover', 'Featured arenas, clear categories and a library made for fast browsing.'],
  ['02', 'Play', 'Instant entry into arcade, action, sports, puzzle and fighting games.'],
  ['03', 'Progress', 'Ranked play, leaderboards and player stats turn every session into momentum.'],
  ['04', 'Return', 'Loot, rewards and daily missions give players a reason to come back.'],
];

export default function GamesPage() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.games-hero-copy > *', { y: 36, opacity: 0, stagger: .1, duration: .9, ease: 'power3.out' });
        gsap.from('.games-hero-poster', { y: 90, rotate: 6, opacity: 0, duration: 1.2, ease: 'power3.out' });
        gsap.to('.games-hero-poster', { y: -16, rotate: 1.5, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.utils.toArray('.games-reveal').forEach((item) => gsap.from(item, {
          y: 55, opacity: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
        }));
        gsap.from('.games-poster-card', {
          y: 80, rotate: (i) => i % 2 ? 3 : -3, opacity: 0, stagger: .12, duration: 1,
          scrollTrigger: { trigger: '.games-poster-grid', start: 'top 82%' },
        });
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <div className="games-page" ref={scope}>
      <section className="games-hero">
        <div className="games-hero-copy">
          <p className="games-kicker">PLAYLOOT / GAME LIBRARY</p>
          <h1><span>100</span> games.<br /><em>One connected arcade.</em></h1>
          <p>I created a library of 100 games inside Playloot—bringing discovery, competition, progression and rewards into one playful experience.</p>
          <div className="games-hero-actions">
            <a className="games-button" href="#games-showreel">Watch the showreel <span>↓</span></a>
            <a className="games-text-link" href="#/projects">Playloot case study ↗</a>
          </div>
        </div>
        <div className="games-hero-visual" aria-label="Playloot games poster">
          <span className="games-orbit" aria-hidden="true" />
          <figure className="games-hero-poster"><img src="/media/games/games-02.jpg" alt="Playloot featured games and arcade library" /><figcaption>THE ARCADE / 100 TITLES</figcaption></figure>
          <span className="games-float games-float-one">INSTANT PLAY</span>
          <span className="games-float games-float-two">RANKED + REWARDED</span>
        </div>
      </section>

      <div className="games-marquee" aria-hidden="true"><div>ACTION ✦ ARCADE ✦ SPORTS ✦ PUZZLE ✦ FIGHTING ✦ ADVENTURE ✦ ACTION ✦ ARCADE ✦ SPORTS ✦ PUZZLE ✦</div></div>

      <section className="games-intro games-reveal">
        <p className="games-kicker">A LIBRARY BUILT FOR DISCOVERY</p>
        <h2>Small games.<br /><em>Big variety.</em></h2>
        <p>Playloot makes a large catalogue feel immediate: browse by mood, jump into a featured arena, compete, then return for the next reward.</p>
      </section>

      <section className="games-poster-grid" aria-label="Selected Playloot game posters">
        <figure className="games-poster-card games-poster-wide"><img src="/media/games/games-01.jpg" alt="Playloot arcade game cards and featured titles" /><figcaption><span>01 / DISCOVER</span><strong>Arcade at a glance</strong></figcaption></figure>
        <figure className="games-poster-card"><img src="/media/games/games-03.jpg" alt="Playloot game library and category navigation" /><figcaption><span>02 / BROWSE</span><strong>Find the next favourite</strong></figcaption></figure>
        <figure className="games-poster-card"><img src="/media/games/games-04.jpg" alt="Playloot instant game selection screen" /><figcaption><span>03 / PLAY</span><strong>One tap from the action</strong></figcaption></figure>
      </section>

      <section className="games-catalogue games-reveal">
        <div className="games-catalogue-heading"><p className="games-kicker">SELECTED FROM THE 100</p><h2>Every scroll<br /><em>changes the pace.</em></h2></div>
        <div className="games-title-list">{games.map(([title, genre], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{genre}</p><b aria-hidden="true">↗</b></article>)}</div>
      </section>

      <section className="games-system">
        <div className="games-system-heading games-reveal"><p className="games-kicker">MORE THAN A CATALOGUE</p><h2>The loop behind<br /><em>the play.</em></h2></div>
        <div>{systems.map(([number, title, copy]) => <article className="games-system-row games-reveal" key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="games-showreel games-reveal" id="games-showreel">
        <div className="games-video-copy"><p className="games-kicker">THE EXPERIENCE / IN MOTION</p><h2>From first tap<br /><em>to the next challenge.</em></h2><p>Explore the real Playloot flow—from game discovery and featured arenas to rankings, loot and player progression.</p></div>
        <div className="games-video-shell"><div className="games-video-top"><span>PLAYLOOT / MOBILE ARCADE</span><span>▶ 01:1</span></div><video src="/media/playloot-mobile.mp4" poster="/media/games/games-02.jpg" controls muted playsInline preload="metadata" aria-label="Playloot game library walkthrough" /></div>
      </section>

      <section className="games-end games-reveal"><p className="games-kicker">100 GAMES / ONE PLAYGROUND</p><h2>Built to browse.<br /><em>Made to replay.</em></h2><a className="games-button games-button-light" href="#/projects">Explore all project work ↗</a></section>
    </div>
  );
}
