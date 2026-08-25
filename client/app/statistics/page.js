"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { isLoggedIn } from "../../lib/auth";

export default function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      setError("guest");
      return;
    }
    api.getStats().then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error === "guest") {
    return (
      <div className="hero">
        <h1 className="page-title">Statistics</h1>
        <p className="page-subtitle">Sign in to see your chanting history.</p>
        <a href="/login" className="btn-primary" style={{ display: "inline-block", width: "auto", padding: "10px 24px" }}>
          Sign in
        </a>
      </div>
    );
  }
  if (error) return <p className="error-text">{error}</p>;
  if (!stats) return <p className="page-subtitle">Loading...</p>;

  const cards = [
    { label: "Total japa", value: stats.total },
    { label: "Active days", value: stats.activeDays },
    { label: "Average/day", value: stats.averagePerDay },
    { label: "Best day", value: stats.bestDay },
  ];

  return (
    <div>
      <h1 className="page-title">Statistics</h1>
      <p className="page-subtitle">Your chanting progress over time.</p>
      <div className="stats-row" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {cards.map((c) => (
          <div key={c.label} className="stat-card">
            <p className="stat-label">{c.label}</p>
            <p className="stat-value">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
