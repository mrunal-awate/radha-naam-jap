"use client";

import { useEffect, useState } from "react";
import { isLoggedIn, getUser, logout } from "../../lib/auth";
import { api } from "../../lib/api";

export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUser(getUser());
  }, []);

  async function handleDelete() {
    setDeleting(true);
    setError("");
    try {
      await api.deleteAccount();
      logout();
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setDeleting(false);
    }
  }

  if (loggedIn === null) return null;

  if (!loggedIn) {
    return (
      <main style={{ maxWidth: 480, margin: "60px auto", padding: "0 20px" }}>
        <h1>My Account</h1>
        <p>
          You need to be logged in to manage your account.{" "}
          <a href="/login">Log in</a> or <a href="/register">create an account</a>.
        </p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 480, margin: "60px auto", padding: "0 20px" }}>
      <h1>My Account</h1>
      {user && (
        <p style={{ color: "var(--text-muted)" }}>
          Signed in as {user.name} ({user.email})
        </p>
      )}

      <hr style={{ margin: "32px 0", opacity: 0.3 }} />

      <h2 style={{ fontSize: "1.1rem" }}>Delete my account</h2>
      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
        This permanently deletes your account, your saved japa counts and
        statistics, and your device notification settings. This cannot be
        undone.
      </p>

      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          style={{
            background: "none",
            border: "1px solid #a33",
            color: "#a33",
            padding: "10px 18px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Delete my account
        </button>
      ) : (
        <div>
          <p style={{ fontWeight: 600 }}>
            Are you sure? This cannot be undone.
          </p>
          {error && <p style={{ color: "#a33" }}>{error}</p>}
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              background: "#a33",
              border: "none",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 6,
              marginRight: 10,
              cursor: deleting ? "default" : "pointer",
              opacity: deleting ? 0.7 : 1,
            }}
          >
            {deleting ? "Deleting..." : "Yes, permanently delete my account"}
          </button>
          <button
            onClick={() => setConfirming(false)}
            disabled={deleting}
            style={{
              background: "none",
              border: "1px solid var(--text-muted)",
              color: "var(--text-muted)",
              padding: "10px 18px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </main>
  );
}