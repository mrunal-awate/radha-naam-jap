import TapCounter from "../components/TapCounter";
import AudioChant from "../components/AudioChant";
import MantraContent from "../components/MantraContent";

async function getDefaultMantra() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mantras/radha`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function HomePage() {
  const mantra = await getDefaultMantra();

  if (!mantra) {
    return <p>Run the seed script (npm run seed in /server) to load mantras first.</p>;
  }

  return (
    <div>
      <div className="hero">
        <p className="hero-eyebrow">Free japa counter</p>
        <h1 className="hero-title">{mantra.nameDevanagari}</h1>
        <p className="hero-subtitle">{mantra.description}</p>
        <AudioChant text={mantra.nameDevanagari} audioSrc={mantra.audioUrl} />
        <TapCounter mantraId={mantra._id} />
      </div>
      <MantraContent mantra={mantra} />
    </div>
  );
}
