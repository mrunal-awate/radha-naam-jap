"use client";

import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "../lib/auth";

export default function NavAuth() {
  // null until mounted, to avoid a server/client hydration mismatch
  // (same reason TapCounter delays reading localStorage — see that
  // component for the fuller explanation).
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  if (loggedIn === null) return null; // avoid flashing the wrong state on load

  if (loggedIn) {
    return (
      <button
        onClick={handleLogout}
        style={{
          background: "none",
          border: "none",
          color: "var(--text-muted)",
          font: "inherit",
          fontSize: 14,
          cursor: "pointer",
          padding: 0,
        }}
      >
        Logout
      </button>
    );
  }

  return (
    <>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </>
  );
}
