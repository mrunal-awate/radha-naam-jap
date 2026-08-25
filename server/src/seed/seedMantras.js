import "dotenv/config";
import { connectDB } from "../config/db.js";
import Mantra from "../models/Mantra.js";
import mongoose from "mongoose";

const mantras = [
  {
    slug: "radha",
    nameEnglish: "Radha",
    nameDevanagari: "राधा",
    description: "A simple, widely chanted name associated with devotion and love in the Vaishnav bhakti tradition.",
    audioUrl: "/audio/radha-naam-jap.mp3",
    meaning: "Radha is regarded in Vaishnav tradition as the eternal consort of Krishna, and is often seen as an embodiment of pure devotion (bhakti) and selfless love. Chanting the name 'Radha' is a common practice among devotees who follow this tradition, used as a simple, repeatable focus for daily remembrance.",
    howToChant: "There's no single required method. Many practitioners chant silently or softly, either using a mala (a string of 108 beads) to keep count, or simply repeating the name for a set period of time. Some prefer chanting aloud in the morning or evening; others chant mentally throughout the day. Consistency is generally considered more important than volume or speed.",
    faq: [
      { question: "How many times should I chant Radha Naam?", answer: "There's no fixed rule. Many traditions use a mala of 108 beads as one round, and some practitioners aim for a set number of rounds daily, but the practice is ultimately personal and varies by individual and lineage." },
      { question: "Do I need a mala to chant?", answer: "No — a mala is a traditional counting aid, not a requirement. This counter is designed as a digital alternative for tracking your count." },
      { question: "Is this practice tied to a specific religion?", answer: "Radha Naam Jap comes from the Vaishnav bhakti tradition within Hinduism. This site presents it as an informational and practical tool; it does not represent any particular organization or guru." },
    ],
  },
  {
    slug: "hare-krishna-hare-krishna",
    nameEnglish: "Hare Krishna Hare Krishna",
    nameDevanagari: "हरे कृष्ण हरे कृष्ण",
    description: "The Maha Mantra, a sixteen-word chant central to Gaudiya Vaishnavism and the Hare Krishna movement.",
    meaning: "Known as the Maha Mantra ('great mantra'), this sixteen-word chant repeats the names Krishna, Rama, and Hare. It is central to Gaudiya Vaishnavism and became widely known internationally through the Hare Krishna movement (ISKCON) from the 20th century onward.",
    howToChant: "Traditionally chanted in rounds of 108 using a mala, often aloud or in a group (kirtan), though silent or individual chanting is also common. Many practitioners set a daily target number of rounds as part of a regular sadhana (spiritual practice).",
    faq: [
      { question: "What does 'Hare' mean in this mantra?", answer: "Hare is a vocative form addressing the divine energy (Hara), and appears throughout the mantra alongside the names Krishna and Rama." },
      { question: "Is chanting this mantra silently effective?", answer: "Different traditions hold different views on spoken versus silent chanting. This site doesn't take a position on that — use whichever approach fits your practice." },
    ],
  },
  {
    slug: "om-namah-shivaya",
    nameEnglish: "Om Namah Shivaya",
    nameDevanagari: "ॐ नमः शिवाय",
    description: "One of the most chanted mantras in Shaivism, a salutation to Lord Shiva.",
    meaning: "Om Namah Shivaya is a Panchakshara ('five-syllable') mantra, a salutation to Shiva. It's one of the most widely recognized mantras across Shaivite traditions in Hinduism, often used in daily worship, meditation, and festivals such as Maha Shivaratri.",
    howToChant: "Commonly chanted using a rudraksha mala, in sets of 108. Some practitioners chant it during specific times of day (such as dawn or dusk) or on particular days associated with Shiva, though there's no single mandatory schedule.",
    faq: [
      { question: "When is this mantra traditionally chanted?", answer: "It's chanted year-round by many practitioners, though it holds particular significance during festivals like Maha Shivaratri and on Mondays in some traditions." },
      { question: "Do I need initiation to chant this mantra?", answer: "Practices vary by lineage and personal belief. This is a general-purpose counter tool and doesn't require any specific initiation to use." },
    ],
  },
  {
    slug: "samb-sadashiv",
    nameEnglish: "Samb Sadashiv",
    nameDevanagari: "साम्ब सदाशिव",
    description: "A devotional chant invoking Shiva in his eternal, auspicious form.",
    meaning: "'Sadashiva' refers to the eternal, ever-auspicious aspect of Shiva in Shaivite theology. 'Samb' (or Sambhu) is another epithet associated with Shiva. Together, this chant is used as an invocation of Shiva's eternal nature.",
    howToChant: "As with other Shiva-focused chants, this is commonly repeated using a mala in rounds of 108, either silently or aloud, as part of a personal devotional routine.",
    faq: [
      { question: "How is this different from Om Namah Shivaya?", answer: "Both are devotional chants associated with Shiva, but use different names and phrasing. Practitioners may use one, the other, or both depending on personal or lineage preference." },
    ],
  },
  {
    slug: "gaytri-mantra",
    nameEnglish: "Gaytri Mantra",
    nameDevanagari: "ॐ भूर्भुवः स्वः",
    description: "A Vedic hymn from the Rigveda, widely regarded as one of the oldest and most universal mantras.",
    meaning: "The Gayatri Mantra is a verse from the Rigveda (one of the oldest Vedic texts), dedicated to Savitr, a solar deity, and is widely chanted across many Hindu traditions regardless of specific sect. It's often associated with wisdom, clarity, and the illumination of the intellect.",
    howToChant: "Traditionally chanted at sunrise, midday, and sunset, though it's also widely chanted at other times. It can be recited individually or in groups, and is one of the most commonly taught mantras in Vedic education.",
    faq: [
      { question: "Is there a right time to chant the Gayatri Mantra?", answer: "Sunrise is the most traditionally cited time, but many practitioners chant it at other times of day as part of their personal routine." },
      { question: "Is this mantra specific to one deity or tradition?", answer: "It's dedicated to Savitr and is one of the most widely used mantras across Hindu traditions generally, not limited to a single sect." },
    ],
  },
  {
    slug: "jai-shri-ram",
    nameEnglish: "Jai Shri Ram",
    nameDevanagari: "जय श्री राम",
    description: "A devotional chant honoring Lord Rama, popular across many Hindu traditions.",
    meaning: "'Jai Shri Ram' translates roughly to 'victory/glory to Lord Rama,' and is a devotional exclamation and chant associated with Rama, an avatar of Vishnu central to the Ramayana. It's chanted in temples, during festivals like Ram Navami, and as part of daily devotional practice.",
    howToChant: "Often chanted aloud, individually or in groups (especially during festivals and processions), though it's also used as a quiet, repeated chant for personal practice and mala counting.",
    faq: [
      { question: "Is this chant only used during festivals?", answer: "It's especially prominent during Ram Navami and related festivals, but many practitioners also use it as part of regular daily devotional practice." },
    ],
  },
];

async function seed() {
  await connectDB();
  for (const m of mantras) {
    await Mantra.findOneAndUpdate({ slug: m.slug }, m, { upsert: true });
  }
  console.log(`Seeded ${mantras.length} mantras`);
  await mongoose.disconnect();
}

seed();
