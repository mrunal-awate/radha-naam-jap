"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";
import { isLoggedIn, addGuestCount, resetGuestCount } from "../lib/auth";

const SYNC_INTERVAL_MS = 5000;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function TapCounter({ mantraId }) {
  const [count, setCount] = useState(0);
  const [rippleKey, setRippleKey] = useState(0);
  // Starts false on both server and client render (avoids hydration
  // mismatch) — flips to the real value only after mount, client-side.
  const [loggedIn, setLoggedIn] = useState(false);
  const pendingRef = useRef(0);

  useEffect(() => {
    const loggedInNow = isLoggedIn();
    setLoggedIn(loggedInNow);
    if (loggedInNow) {
      api.getToday(mantraId, todayKey())
        .then(({ count: saved }) => setCount(saved))
        .catch(() => {});
    }
  }, [mantraId]);

  useEffect(() => {
    if (!loggedIn) return;
    const interval = setInterval(async () => {
      if (pendingRef.current > 0) {
        const toSync = pendingRef.current;
        pendingRef.current = 0;
        try {
          await api.syncJapa({ mantraId, date: todayKey(), increment: toSync });
        } catch {
          pendingRef.current += toSync;
        }
      }
    }, SYNC_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [mantraId, loggedIn]);

  function handleTap() {
    setCount((c) => c + 1);
    setRippleKey((k) => k + 1);
    if (loggedIn) {
      pendingRef.current += 1;
    } else {
      addGuestCount(mantraId, 1);
    }
  }

  async function handleReset() {
    if (!window.confirm("Reset today's count for this mantra to 0?")) return;
    setCount(0);
    pendingRef.current = 0;
    if (loggedIn) {
      try {
        await api.resetJapa({ mantraId, date: todayKey() });
      } catch {
        // local display is already 0; next sync tick won't push anything
        // stale since pendingRef was cleared above
      }
    } else {
      resetGuestCount(mantraId);
    }
  }

  return (
    <>
      <div className="counter-wrap">
        <div className="counter-ring outer" />
        <div className="counter-ring" />
        <button className="counter-btn" onClick={handleTap} aria-label="Tap to count a japa">
          {count}
        </button>
        <span key={rippleKey} className="ripple animate" />
      </div>

      <button
        onClick={handleReset}
        style={{
          background: "none",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          borderRadius: 8,
          padding: "6px 16px",
          fontSize: 13,
          cursor: "pointer",
          marginBottom: 24,
        }}
      >
        Reset today's count
      </button>

      <div className="stats-row">
        <div className="stat-card">
          <p className="stat-label">Malas</p>
          <p className="stat-value">{(count / 108).toFixed(1)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Today</p>
          <p className="stat-value">{count}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Status</p>
          <p className="stat-value" style={{ fontSize: 13 }}>{loggedIn ? "Saved" : "Guest"}</p>
        </div>
      </div>

      <div className="guest-banner">
        {loggedIn
          ? "Your count is saved to your account."
          : <>Tap freely, no account needed. <a href="/register">Sign in</a> when you want your count saved.</>}
      </div>
    </>
  );
}
