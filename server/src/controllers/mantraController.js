import Mantra from "../models/Mantra.js";

export async function listMantras(req, res) {
  const mantras = await Mantra.find().sort({ createdAt: 1 });
  res.json(mantras);
}

export async function getMantraBySlug(req, res) {
  const mantra = await Mantra.findOne({ slug: req.params.slug });
  if (!mantra) return res.status(404).json({ error: "Mantra not found" });
  res.json(mantra);
}
