"use client";

const DONATION_URL = "https://rzp.io/rzp/jGamBNf";

export default function DonateButton({ style }) {
  async function handleClick(e) {
    if (typeof window !== "undefined" && window.Capacitor?.isNativePlatform?.()) {
      e.preventDefault();
      try {
        const { Browser } = await import("@capacitor/browser");
        await Browser.open({ url: DONATION_URL });
      } catch (err) {
        window.open(DONATION_URL, "_blank", "noopener,noreferrer");
      }
    }
  }

  return (
    <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{ color: "var(--gold, #c9932e)", fontWeight: 600, ...style }}>
      🙏 Donate
    </a>
  );
}