const BASE_URL = "https://www.naamjapa.online";

export default async function sitemap() {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/naam-japa-counter",
    "/statistics",
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1 : 0.7,
  }));

  let mantraUrls = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mantras`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      const mantras = await response.json();

      mantraUrls = mantras.map((mantra) => ({
        url: `${BASE_URL}/naam-japa-counter/${mantra.slug}`,
        lastModified: mantra.updatedAt
          ? new Date(mantra.updatedAt)
          : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Failed to load mantras for sitemap:", error);
  }

  return [...staticUrls, ...mantraUrls];
}