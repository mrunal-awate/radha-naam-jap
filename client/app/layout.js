import "../styles/globals.css";
import NavAuth from "../components/NavAuth";

import FirebaseNotifications from "../components/FirebaseNotifications";
import DonateButton from "../components/DonateButton";


export const metadata = {
  title: "Radha Naam Jap Counter — free online mantra counter",
  description: "Count your japa online, free. Track Radha Naam and other mantras, build a daily chanting streak, no signup required to start.",
  openGraph: {
    title: "Radha Naam Jap Counter",
    description: "A free online japa counter for Radha Naam and other mantras.",
    type: "website",
  },
  // TODO: after deploying, get your verification code from Google Search
  // Console (Settings > Ownership verification > HTML tag) and paste it
  // here, e.g. verification: { google: "abc123..." }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600&family=Work+Sans:wght@400;500&family=Noto+Serif+Devanagari:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FirebaseNotifications />
        <header className="site-header">
          <a href="/" className="brand">
            <span className="brand-mark">🪔</span>
            Radha Naam Jap
          </a>
          <nav className="site-nav">
            <a href="/naam-japa-counter">Mantras</a>
            <a href="/statistics">Statistics</a>
            <DonateButton />
            <NavAuth />
          </nav>
        </header>
        <main className="main-wrap">{children}</main>
        <footer className="site-footer">
          <p style={{ marginBottom: 12 }}>A quiet space to count your japa. Free, always.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms</a>
            <a href="/disclaimer">Disclaimer</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
