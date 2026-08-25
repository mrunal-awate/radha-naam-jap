import TapCounter from "../../../components/TapCounter";
import AudioChant from "../../../components/AudioChant";
import MantraContent from "../../../components/MantraContent";

async function getMantra(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mantras/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const mantra = await getMantra(params.slug);
  if (!mantra) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const title = `${mantra.nameEnglish} Jap Counter — free online mantra counter`;
  const description = `Count your ${mantra.nameEnglish} (${mantra.nameDevanagari}) japa online, free, no signup needed.`;
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/naam-japa-counter/${mantra.slug}` },
    openGraph: { title, description, url: `${siteUrl}/naam-japa-counter/${mantra.slug}`, type: "website" },
  };
}

export default async function MantraCounterPage({ params }) {
  const mantra = await getMantra(params.slug);
  if (!mantra) return <p>Mantra not found.</p>;

  const structuredData = mantra.audioUrl
    ? {
        "@context": "https://schema.org",
        "@type": "AudioObject",
        name: `${mantra.nameEnglish} chant`,
        contentUrl: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${mantra.audioUrl}`,
        description: mantra.description,
        inLanguage: "hi",
      }
    : null;

  return (
    <div>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <div className="hero">
        <p className="hero-eyebrow">{mantra.nameEnglish}</p>
        <h1 className="hero-title">{mantra.nameDevanagari}</h1>
        <p className="hero-subtitle">{mantra.description}</p>
        <AudioChant text={mantra.nameDevanagari} audioSrc={mantra.audioUrl} />
        <TapCounter mantraId={mantra._id} />
      </div>
      <MantraContent mantra={mantra} />
    </div>
  );
}
