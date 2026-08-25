const BASE_URL = "https://www.naamjapa.online";

export default async function sitemap() {
  // Public static pages
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

  // Dynamic mantra pages
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
    console.error("Failed to fetch mantras for sitemap:", error);
  }

  return [...staticUrls, ...mantraUrls];
}




// ------------------------------------------------------------------------


// const BASE_URL = "https://www.naamjapa.online";

// export default function sitemap() {
//   return [
//     {
//       url: BASE_URL,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 1,
//     },
//     {
//       url: `${BASE_URL}/about`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.7,
//     },
//     {
//       url: `${BASE_URL}/contact`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.7,
//     },
//     {
//       url: `${BASE_URL}/privacy-policy`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.5,
//     },
//     {
//       url: `${BASE_URL}/terms`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.5,
//     },
//     {
//       url: `${BASE_URL}/disclaimer`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.5,
//     },
//     {
//       url: `${BASE_URL}/naam-japa-counter`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.9,
//     },
//     {
//       url: `${BASE_URL}/statistics`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.7,
//     },
//   ];
// }