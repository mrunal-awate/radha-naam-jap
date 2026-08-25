"use client";

import { useState } from "react";
import { api } from "../../lib/api";
import { saveSession, migrateGuestCounts } from "../../lib/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Fill in every field.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await api.register({ name, email, password });
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
      <h1 className="page-title" style={{ fontSize: 22 }}>Create account</h1>
      {error && <p className="error-text">{error}</p>}
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="field" />
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
        {loading ? "Creating account..." : "Create account"}
      </button>
      <p className="form-footnote">Already have an account? <a href="/login" style={{ color: "var(--gold-bright)" }}>Sign in</a></p>
    </form>
  );
}
