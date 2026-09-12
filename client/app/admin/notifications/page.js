"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";

export default function AdminNotificationsPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getMe()
      .then((data) => {
        setIsAdmin(!!data.user?.isAdmin);
        setChecking(false);
      })
      .catch(() => {
        router.replace("/");
      });
  }, [router]);

  if (checking) return null;
  if (!isAdmin) return null;

  async function handleSend(e) {
    e.preventDefault();
    setSending(true);
    setError("");
    setResult(null);
    try {
      const data = await api.sendNotification({ target: "all", title, body });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 24 }}>
      <h1>Send Notification</h1>
      <form onSubmit={handleSend}>
        <div style={{ marginBottom: 16 }}>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send to all devices"}
        </button>
      </form>
      {result && (
        <p style={{ marginTop: 16 }}>
          Sent — success: {result.successCount}, failed: {result.failureCount}, invalid removed: {result.invalidTokensRemoved}
        </p>
      )}
      {error && <p style={{ marginTop: 16, color: "red" }}>{error}</p>}
    </div>
  );
}