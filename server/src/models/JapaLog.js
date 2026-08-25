import mongoose from "mongoose";

const japaLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mantraId: { type: mongoose.Schema.Types.ObjectId, ref: "Mantra", required: true },
    date: { type: String, required: true }, // "YYYY-MM-DD", day-level not timestamp
    count: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

// one document per user+mantra+day — sync endpoint upserts into this
japaLogSchema.index({ userId: 1, mantraId: 1, date: 1 }, { unique: true });

export default mongoose.model("JapaLog", japaLogSchema);
