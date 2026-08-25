async function getMantras() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mantras`, { cache: "no-store" });
  return res.ok ? res.json() : [];
}

export const metadata = { title: "Choose your mantra — Radha Naam Jap Counter" };

export default async function MantraGridPage() {
  const mantras = await getMantras();

  return (
    <div>
      <h1 className="page-title">Choose your mantra</h1>
      <p className="page-subtitle">Select a mantra to begin. Tap anywhere on the counter to log a repetition.</p>
      <div className="mantra-grid">
        {mantras.map((m) => (
          <a key={m.slug} href={`/naam-japa-counter/${m.slug}`} className="mantra-card">
            <p className="mantra-card-name">{m.nameEnglish}</p>
            <p className="mantra-card-devanagari">{m.nameDevanagari}</p>
            <p className="mantra-card-desc">{m.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
