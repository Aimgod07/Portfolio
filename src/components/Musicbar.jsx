import { useEffect, useRef, useState } from "react";
import "../components/Musicbar.css";



export const DEFAULT_SONGS = [
  {
    id: 1,
    title: "Midnight Drive",
    artist: "Nova Waves",
    cover: "https://picsum.photos/seed/song1/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Neon Skyline",
    artist: "Echo Park",
    cover: "https://picsum.photos/seed/song2/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Glass Horizon",
    artist: "Fade Theory",
    cover: "https://picsum.photos/seed/song3/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Static Bloom",
    artist: "Halcyon Drift",
    cover: "https://picsum.photos/seed/song4/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Amber Signal",
    artist: "Late Nova",
    cover: "https://picsum.photos/seed/song5/200/200",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

function formatTime(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function MusicBar({ songs = DEFAULT_SONGS }) {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showList, setShowList] = useState(false);

  const track = songs[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setProgress(0);
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const playAt = (i) => {
    setIndex(i);
    setIsPlaying(true);
    setShowList(false);
  };

  const next = () => setIndex((i) => (i + 1) % songs.length);
  const prev = () => setIndex((i) => (i - 1 + songs.length) % songs.length);

  const onSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const pct = Number(e.target.value) / 100;
    audio.currentTime = pct * duration;
    setProgress(pct * 100);
  };

  const progressPct = duration ? (progress / 100) * 100 : 0;

  return (
    <div className="musicbar">
      <audio
        ref={audioRef}
        src={track.src}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          const d = e.currentTarget.duration || 0;
          setDuration(d);
          setProgress(d ? (e.currentTarget.currentTime / d) * 100 : 0);
        }}
        onEnded={next}
      />

      <div className="musicbar__row">
        <button className="musicbar__ctrl" onClick={prev} aria-label="Previous track">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zM20 6L9 12l11 6V6z" />
          </svg>
        </button>

        <button className="musicbar__play" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button className="musicbar__ctrl" onClick={next} aria-label="Next track">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 6h2v12h-2zM4 6l11 6-11 6V6z" />
          </svg>
        </button>

        <div className="musicbar__track">
          <img src={track.cover} alt={track.title} />
          <div className="musicbar__meta">
            <strong>{track.title}</strong>
            <span>{track.artist}</span>
          </div>
        </div>

        <div className="musicbar__seek">
          <span>{formatTime(audioRef.current?.currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={Number.isFinite(progressPct) ? progressPct : 0}
            onChange={onSeek}
            aria-label="Seek"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="musicbar__icons">
          <button className="musicbar__icon" aria-label="Captions">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M8 12h1M8 15h4M15 12h1M15 15h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
          <button className="musicbar__icon" aria-label="Comments">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H8l-4 4V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
          </button>
          <button
            className={`musicbar__icon ${showList ? "is-active" : ""}`}
            aria-label="Playlist"
            onClick={() => setShowList((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
          <button className="musicbar__icon" aria-label="Volume">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M17 9a4 4 0 010 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      {showList && (
        <ul className="musicbar__playlist">
          {songs.map((s, i) => (
            <li key={s.id}>
              <button
                className={i === index ? "is-active" : ""}
                onClick={() => playAt(i)}
              >
                <img src={s.cover} alt="" />
                <span>
                  <strong>{s.title}</strong>
                  <em>{s.artist}</em>
                </span>
                {i === index && isPlaying && <i className="musicbar__eq" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}