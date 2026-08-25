async function getMantras() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mantras`, { cache: "no-store" });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const mantras = await getMantras();

  const staticPages = [
    "", "naam-japa-counter", "statistics", "about", "contact",
    "privacy-policy", "terms", "disclaimer",
  ].map((path) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
  }));

  const mantraPages = mantras.map((m) => ({
    url: `${base}/naam-japa-counter/${m.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...mantraPages];
}
