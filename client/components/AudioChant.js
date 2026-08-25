"use client";

import { useEffect, useRef, useState } from "react";

const SPEEDS = [0.75, 1, 1.25, 1.5];

export default function AudioChant({ text, audioSrc }) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef(null);
  const playingRef = useRef(false);
  const speedRef = useRef(1); // read inside closures (TTS loop callback) without stale values

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      window.speechSynthesis?.cancel();
    };
  }, []);

  function speakOnce() {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.8 * speedRef.current;
    utterance.onend = () => {
      if (playingRef.current) {
        setTimeout(() => {
          if (playingRef.current) speakOnce();
        }, 500 / speedRef.current);
      }
    };
    window.speechSynthesis.speak(utterance);
  }

  function toggle() {
    if (playing) {
      playingRef.current = false;
      setPlaying(false);
      if (audioSrc) {
        audioRef.current?.pause();
      } else {
        window.speechSynthesis.cancel();
      }
    } else {
      playingRef.current = true;
      setPlaying(true);
      if (audioSrc) {
        audioRef.current.playbackRate = speedRef.current;
        audioRef.current?.play().catch(() => {});
      } else {
        speakOnce();
      }
    }
  }

  function changeSpeed(newSpeed) {
    setSpeed(newSpeed);
    speedRef.current = newSpeed;
    if (audioSrc && audioRef.current) {
      audioRef.current.playbackRate = newSpeed; // applies live, even mid-playback
    }
    // TTS speed only takes effect on the next loop iteration — a new
    // utterance can't have its rate changed once it has started speaking.
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {audioSrc && <audio ref={audioRef} src={audioSrc} loop preload="none" />}

      <button
        onClick={toggle}
        className="audio-btn"
        aria-label={playing ? "Mute chanting" : "Play chanting"}
        aria-pressed={playing}
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
        <span>{playing ? "Mute" : "Chant"}</span>
      </button>

      <div className="speed-controls">
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => changeSpeed(s)}
            className={`speed-btn ${speed === s ? "active" : ""}`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
