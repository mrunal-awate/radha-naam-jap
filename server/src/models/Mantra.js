import mongoose from "mongoose";

const mantraSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    nameEnglish: { type: String, required: true },
    nameDevanagari: { type: String, required: true },
    description: { type: String, default: "" },
    audioUrl: { type: String, default: "" }, // e.g. "/audio/radha-naam-jap.mp3"
    meaning: { type: String, default: "" },
    howToChant: { type: String, default: "" },
    faq: [{ question: String, answer: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Mantra", mantraSchema);
