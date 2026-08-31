// import "dotenv/config";
// import { connectDB } from "../config/db.js";
// import Mantra from "../models/Mantra.js";
// import mongoose from "mongoose";

// const mantras = [
//   {
//     slug: "radha",
//     nameEnglish: "Radha",
//     nameDevanagari: "राधा",
//     description: "A simple, widely chanted name associated with devotion and love in the Vaishnav bhakti tradition.",
//     audioUrl: "/audio/radha-naam-jap.mp3",
//     meaning: "Radha is regarded in Vaishnav tradition as the eternal consort of Krishna, and is often seen as an embodiment of pure devotion (bhakti) and selfless love. Chanting the name 'Radha' is a common practice among devotees who follow this tradition, used as a simple, repeatable focus for daily remembrance.",
//     howToChant: "There's no single required method. Many practitioners chant silently or softly, either using a mala (a string of 108 beads) to keep count, or simply repeating the name for a set period of time. Some prefer chanting aloud in the morning or evening; others chant mentally throughout the day. Consistency is generally considered more important than volume or speed.",
//     faq: [
//       { question: "How many times should I chant Radha Naam?", answer: "There's no fixed rule. Many traditions use a mala of 108 beads as one round, and some practitioners aim for a set number of rounds daily, but the practice is ultimately personal and varies by individual and lineage." },
//       { question: "Do I need a mala to chant?", answer: "No — a mala is a traditional counting aid, not a requirement. This counter is designed as a digital alternative for tracking your count." },
//       { question: "Is this practice tied to a specific religion?", answer: "Radha Naam Jap comes from the Vaishnav bhakti tradition within Hinduism. This site presents it as an informational and practical tool; it does not represent any particular organization or guru." },
//     ],
//   },
//   {
//     slug: "hare-krishna-hare-krishna",
//     nameEnglish: "Hare Krishna Hare Krishna",
//     nameDevanagari: "हरे कृष्ण हरे कृष्ण",
//     description: "The Maha Mantra, a sixteen-word chant central to Gaudiya Vaishnavism and the Hare Krishna movement.",
//     meaning: "Known as the Maha Mantra ('great mantra'), this sixteen-word chant repeats the names Krishna, Rama, and Hare. It is central to Gaudiya Vaishnavism and became widely known internationally through the Hare Krishna movement (ISKCON) from the 20th century onward.",
//     howToChant: "Traditionally chanted in rounds of 108 using a mala, often aloud or in a group (kirtan), though silent or individual chanting is also common. Many practitioners set a daily target number of rounds as part of a regular sadhana (spiritual practice).",
//     faq: [
//       { question: "What does 'Hare' mean in this mantra?", answer: "Hare is a vocative form addressing the divine energy (Hara), and appears throughout the mantra alongside the names Krishna and Rama." },
//       { question: "Is chanting this mantra silently effective?", answer: "Different traditions hold different views on spoken versus silent chanting. This site doesn't take a position on that — use whichever approach fits your practice." },
//     ],
//   },
//   {
//     slug: "om-namah-shivaya",
//     nameEnglish: "Om Namah Shivaya",
//     nameDevanagari: "ॐ नमः शिवाय",
//     description: "One of the most chanted mantras in Shaivism, a salutation to Lord Shiva.",
//     meaning: "Om Namah Shivaya is a Panchakshara ('five-syllable') mantra, a salutation to Shiva. It's one of the most widely recognized mantras across Shaivite traditions in Hinduism, often used in daily worship, meditation, and festivals such as Maha Shivaratri.",
//     howToChant: "Commonly chanted using a rudraksha mala, in sets of 108. Some practitioners chant it during specific times of day (such as dawn or dusk) or on particular days associated with Shiva, though there's no single mandatory schedule.",
//     faq: [
//       { question: "When is this mantra traditionally chanted?", answer: "It's chanted year-round by many practitioners, though it holds particular significance during festivals like Maha Shivaratri and on Mondays in some traditions." },
//       { question: "Do I need initiation to chant this mantra?", answer: "Practices vary by lineage and personal belief. This is a general-purpose counter tool and doesn't require any specific initiation to use." },
//     ],
//   },
//   {
//     slug: "samb-sadashiv",
//     nameEnglish: "Samb Sadashiv",
//     nameDevanagari: "साम्ब सदाशिव",
//     description: "A devotional chant invoking Shiva in his eternal, auspicious form.",
//     meaning: "'Sadashiva' refers to the eternal, ever-auspicious aspect of Shiva in Shaivite theology. 'Samb' (or Sambhu) is another epithet associated with Shiva. Together, this chant is used as an invocation of Shiva's eternal nature.",
//     howToChant: "As with other Shiva-focused chants, this is commonly repeated using a mala in rounds of 108, either silently or aloud, as part of a personal devotional routine.",
//     faq: [
//       { question: "How is this different from Om Namah Shivaya?", answer: "Both are devotional chants associated with Shiva, but use different names and phrasing. Practitioners may use one, the other, or both depending on personal or lineage preference." },
//     ],
//   },
//   {
//     slug: "gayatri-mantra",
//     nameEnglish: "Gayatri Mantra",
//     nameDevanagari: "ॐ भूर्भुवः स्वः",
//     description: "A Vedic hymn from the Rigveda, widely regarded as one of the oldest and most universal mantras.",
//     meaning: "The Gayatri Mantra is a verse from the Rigveda (one of the oldest Vedic texts), dedicated to Savitr, a solar deity, and is widely chanted across many Hindu traditions regardless of specific sect. It's often associated with wisdom, clarity, and the illumination of the intellect.",
//     howToChant: "Traditionally chanted at sunrise, midday, and sunset, though it's also widely chanted at other times. It can be recited individually or in groups, and is one of the most commonly taught mantras in Vedic education.",
//     faq: [
//       { question: "Is there a right time to chant the Gayatri Mantra?", answer: "Sunrise is the most traditionally cited time, but many practitioners chant it at other times of day as part of their personal routine." },
//       { question: "Is this mantra specific to one deity or tradition?", answer: "It's dedicated to Savitr and is one of the most widely used mantras across Hindu traditions generally, not limited to a single sect." },
//     ],
//   },
//   {
//     slug: "jai-shri-ram",
//     nameEnglish: "Jai Shri Ram",
//     nameDevanagari: "जय श्री राम",
//     description: "A devotional chant honoring Lord Rama, popular across many Hindu traditions.",
//     meaning: "'Jai Shri Ram' translates roughly to 'victory/glory to Lord Rama,' and is a devotional exclamation and chant associated with Rama, an avatar of Vishnu central to the Ramayana. It's chanted in temples, during festivals like Ram Navami, and as part of daily devotional practice.",
//     howToChant: "Often chanted aloud, individually or in groups (especially during festivals and processions), though it's also used as a quiet, repeated chant for personal practice and mala counting.",
//     faq: [
//       { question: "Is this chant only used during festivals?", answer: "It's especially prominent during Ram Navami and related festivals, but many practitioners also use it as part of regular daily devotional practice." },
//     ],
//   },
// ];


// async function seed() {
//   await connectDB();

//   // Remove old/misspelled Gayatri mantra slug
//   await Mantra.deleteOne({ slug: "gaytri-mantra" });

//   for (const m of mantras) {
//     await Mantra.findOneAndUpdate(
//       { slug: m.slug },
//       m,
//       { upsert: true, new: true }
//     );
//   }

//   console.log(`Seeded ${mantras.length} mantras`);

//   await mongoose.disconnect();
// }

// seed();









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
    slug: "gayatri-mantra",
    nameEnglish: "Gayatri Mantra",
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
  {
    slug: "govinda",
    nameEnglish: "Govinda",
    nameDevanagari: "गोविन्द",
    description: "A widely chanted name of Krishna, used throughout Vaishnav devotional literature.",
    meaning: "Govinda is one of the most commonly used names of Krishna, appearing throughout Vaishnav scripture and devotional literature. It's traditionally understood to mean 'protector of cows,' and in a more symbolic reading, 'one who brings light to the senses.' It's chanted as a simple, direct form of remembrance.",
    howToChant: "Chanted the same way as other simple names on this site — silently, aloud, or with a mala, in whatever rhythm suits your practice.",
    faq: [
      { question: "Is Govinda a separate deity from Krishna?", answer: "No — Govinda is a name/epithet of Krishna, not a separate deity." },
    ],
  },
  {
    slug: "om-namo-bhagavate-vasudevaya",
    nameEnglish: "Om Namo Bhagavate Vasudevaya",
    nameDevanagari: "ॐ नमो भगवते वासुदेवाय",
    description: "The Dvadashakshari (twelve-syllable) mantra, a central mantra of surrender in Vaishnav worship.",
    meaning: "Known as the Dvadashakshari Mantra ('twelve-syllable mantra'), this addresses Vasudeva — a name referring to Krishna as the son of Vasudeva, and by extension Vishnu. It's one of the most widely used mantras in Vaishnav worship, traditionally associated with surrender and remembrance of the divine.",
    howToChant: "Commonly chanted using a tulsi mala, in rounds of 108, as part of daily worship or meditation.",
    faq: [
      { question: "What does 'Vasudeva' refer to?", answer: "Vasudeva is a name for Krishna as the son of Vasudeva, and is also used more broadly as an epithet of Vishnu." },
    ],
  },
  {
    slug: "om-namo-narayanaya",
    nameEnglish: "Om Namo Narayanaya",
    nameDevanagari: "ॐ नमो नारायणाय",
    description: "The Ashtakshara (eight-syllable) mantra, one of the most important mantras in Vaishnavism.",
    meaning: "Known as the Ashtakshara Mantra ('eight-syllable mantra'), this is addressed to Narayana — a name of Vishnu understood in tradition as the sustainer of the universe. It's considered one of the foundational mantras of Vaishnav practice.",
    howToChant: "Commonly chanted with a mala in rounds of 108, as part of daily devotional practice.",
    faq: [],
  },
  {
    slug: "mahamrityunjaya-mantra",
    nameEnglish: "Mahamrityunjaya Mantra",
    nameDevanagari: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॥",
    description: "A Rigvedic verse addressed to Shiva (Rigveda 7.59.12), traditionally chanted for health, protection, and longevity.",
    meaning: "The Mahamrityunjaya Mantra ('great death-conquering mantra'), also called the Tryambakam Mantra, is a verse from the Rigveda (7.59.12) addressed to Tryambaka, 'the three-eyed one,' an epithet of Shiva. It is one of the oldest and most revered verses in Hindu tradition, traditionally associated with health, protection, and longevity.",
    howToChant: "Traditionally chanted 108 times using a rudraksha mala, often during illness, difficult life transitions, or as part of a regular daily practice. Because this is a full verse rather than a short name, many practitioners start with fewer repetitions and build up gradually.",
    faq: [
      { question: "Is this different from the short name-based chants on this site?", answer: "Yes — it's a full Vedic verse rather than a repeated short name, so each repetition takes longer to recite aloud. The counter still works the same way: each tap logs one complete repetition." },
    ],
  },
  {
    slug: "har-har-mahadev",
    nameEnglish: "Har Har Mahadev",
    nameDevanagari: "हर हर महादेव",
    description: "A devotional exclamation honoring Shiva, widely heard in temples and during Shiva festivals.",
    meaning: "'Har Har Mahadev' is a widely used devotional chant invoking Shiva ('Mahadev,' the great god). It's commonly heard in temples, during festivals such as Maha Shivaratri, and as an exclamation of devotion among Shiva's devotees.",
    howToChant: "Often chanted aloud, individually or in groups, though it also works well as a quiet, repeated chant for personal mala practice.",
    faq: [],
  },
  {
    slug: "om-aim-hreem-kleem",
    nameEnglish: "Om Aim Hreem Kleem",
    nameDevanagari: "ॐ ऐं ह्रीं क्लीं",
    description: "A combination of bija (seed) mantras associated with Saraswati, Devi, and Krishna/Kali in Shakta tradition.",
    meaning: "Aim, Hreem, and Kleem are bija (seed) mantras — short syllables traditionally understood to carry spiritual vibration rather than literal, dictionary meaning. Aim is associated with Saraswati (wisdom), Hreem with Devi/Durga (Shakti), and Kleem with Krishna or Kali depending on tradition. Chanted together, they're used in Shakta and Tantric practice as an invocation of divine feminine energy.",
    howToChant: "Typically chanted with a mala in rounds of 108. Some practitioners learn this under the guidance of a teacher familiar with bija mantra practice; others chant it independently as part of general devotion.",
    faq: [
      { question: "Do bija mantras have literal meanings?", answer: "Not in the way ordinary words do. They're traditionally understood as sound vibrations associated with specific deities or energies, rather than words with a dictionary definition." },
    ],
  },
  {
    slug: "jai-mata-di",
    nameEnglish: "Jai Mata Di",
    nameDevanagari: "जय माता दी",
    description: "A popular devotional exclamation meaning 'Glory to the Mother,' widely used in Durga and Shakti worship.",
    meaning: "'Jai Mata Di' translates to 'Glory to the Mother,' referring to the Divine Mother (Durga/Devi). It's one of the most widely recognized devotional phrases in North Indian Shakti worship, especially prominent during Navratri.",
    howToChant: "Commonly chanted aloud during festivals like Navratri and at Devi temples, and also used as a quiet, personal chant for daily devotion.",
    faq: [],
  },
  {
    slug: "om-sri-matre-namah",
    nameEnglish: "Om Sri Matre Namah",
    nameDevanagari: "ॐ श्री मात्रे नमः",
    description: "A salutation mantra to the Divine Mother, associated with Devi worship in Shakta tradition.",
    meaning: "This mantra offers salutations ('namah') to Sri Mata, the Divine Mother, particularly associated with Lalita Tripura Sundari in Shakta tradition. It's part of the broader family of mantras used in Devi worship.",
    howToChant: "Commonly chanted with a mala in rounds of 108, as part of daily devotional practice.",
    faq: [],
  },
  {
    slug: "om-gan-ganapataye-namah",
    nameEnglish: "Om Gan Ganapataye Namah",
    nameDevanagari: "ॐ गं गणपतये नमः",
    description: "A salutation mantra to Ganesha, traditionally chanted before beginning new undertakings.",
    meaning: "This mantra combines the bija syllable 'Gam' with a salutation to Ganapati (Ganesha), traditionally regarded as the remover of obstacles. It's commonly chanted at the start of new endeavors, ceremonies, and daily worship.",
    howToChant: "Often chanted before beginning a task, journey, or puja, as well as used as part of regular daily practice with a mala.",
    faq: [
      { question: "Why is this mantra chanted before starting something new?", answer: "Ganesha is traditionally regarded as the remover of obstacles, so this mantra is customarily chanted at the outset of new undertakings." },
    ],
  },
  {
    slug: "om-hanumate-namah",
    nameEnglish: "Om Hanumate Namah",
    nameDevanagari: "ॐ हनुमते नमः",
    description: "A salutation mantra to Hanuman, associated with strength, courage, and devotion.",
    meaning: "This is a direct salutation to Hanuman, the devoted follower of Rama known in tradition for strength, courage, and unwavering devotion. Devotees chant it seeking to cultivate these same qualities in themselves.",
    howToChant: "Commonly chanted with a mala in rounds of 108, as part of daily devotional practice.",
    faq: [],
  },
  {
    slug: "jai-hanuman",
    nameEnglish: "Jai Hanuman",
    nameDevanagari: "जय हनुमान",
    description: "A devotional chant honoring Hanuman, popular in temples and among devotees of the Ramayana tradition.",
    meaning: "'Jai Hanuman' is a devotional exclamation meaning 'Glory to Hanuman,' commonly chanted in temples, especially on Tuesdays and Saturdays (traditionally associated with Hanuman worship), and as part of daily devotional routines.",
    howToChant: "Often chanted aloud in temples and group settings, and also used as a quiet chant for personal mala practice.",
    faq: [],
  },
  {
    slug: "om",
    nameEnglish: "Om",
    nameDevanagari: "ॐ",
    description: "The primordial sound syllable, considered foundational across Hindu, Buddhist, and yogic traditions.",
    meaning: "Om (or Aum) is considered in many Hindu and yogic traditions to be the primordial sound from which creation is said to arise. It's chanted as a mantra on its own, and is also used as a prefix to nearly every other Sanskrit mantra.",
    howToChant: "Often chanted as a single, sustained syllable (A-U-M), sometimes at the start and end of a meditation or japa session, and sometimes repeated on its own for extended periods.",
    faq: [
      { question: "Why is Om often placed before other mantras?", answer: "It's traditionally used as an invocatory sound that opens a mantra, representing the totality of sound and creation before the specific mantra that follows." },
    ],
  },
  {
    slug: "so-hum",
    nameEnglish: "So Hum",
    nameDevanagari: "सोऽहम्",
    description: "A meditative mantra meaning 'I am That,' often linked to the natural rhythm of the breath.",
    meaning: "'So Hum' translates roughly to 'I am That,' and is used as a meditative mantra reflecting on one's identity with universal consciousness. It's closely tied to the natural rhythm of breathing in some pranayama and meditation traditions — 'So' on the inhale, 'Hum' on the exhale.",
    howToChant: "Often practiced silently in coordination with the breath, rather than counted with a mala — though you're welcome to count it here like any other mantra if that suits your practice better.",
    faq: [
      { question: "Do I need to coordinate this with my breath?", answer: "Many traditions do link it to breathing, but you can chant and count it like any other mantra on this site if that fits your practice better." },
    ],
  },
  {
    slug: "om-shanti-om",
    nameEnglish: "Om Shanti Om",
    nameDevanagari: "ॐ शांति ॐ",
    description: "A peace mantra, commonly chanted at the close of prayers, meditation, or ceremonies.",
    meaning: "'Shanti' means peace. This mantra is commonly chanted — often three times in succession — at the conclusion of prayers, meditation sessions, or Vedic ceremonies, as an invocation of peace for oneself and for all beings.",
    howToChant: "Traditionally chanted a few times (often three) at the end of a practice session, though it can also be used as a standalone repeated chant.",
    faq: [],
  },
  {
    slug: "om-sai-ram",
    nameEnglish: "Om Sai Ram",
    nameDevanagari: "ॐ साईं राम",
    description: "A devotional chant associated with Sai Baba of Shirdi, popular across a broad, modern devotional following.",
    meaning: "'Om Sai Ram' is a devotional chant associated with Sai Baba of Shirdi, a saint venerated by a wide and diverse following across religious lines. It's commonly chanted in Sai temples and as part of daily personal devotion.",
    howToChant: "Often chanted aloud in group settings — for example, at Sai temples on Thursdays — as well as quietly for personal practice with a mala.",
    faq: [],
  },
];

async function seed() {
  await connectDB();

  // Remove old/misspelled Gayatri mantra slug
  await Mantra.deleteOne({ slug: "gaytri-mantra" });

  for (const m of mantras) {
    await Mantra.findOneAndUpdate(
      { slug: m.slug },
      m,
      { upsert: true, new: true }
    );
  }

  console.log(`Seeded ${mantras.length} mantras`);

  await mongoose.disconnect();
}

seed();
