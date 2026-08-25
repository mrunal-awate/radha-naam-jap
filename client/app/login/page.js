"use client";

import { useState } from "react";
import { api } from "../../lib/api";
import { saveSession, migrateGuestCounts } from "../../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await api.login({ email, password });
      saveSession(token, user);
      await migrateGuestCounts(api);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h1 className="page-title" style={{ fontSize: 22 }}>Sign in</h1>
      {error && <p className="error-text">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="field"
      />
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <p className="form-footnote">No account? <a href="/register" style={{ color: "var(--gold-bright)" }}>Register</a></p>
    </form>
  );
}
