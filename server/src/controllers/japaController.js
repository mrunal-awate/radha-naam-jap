import JapaLog from "../models/JapaLog.js";

// Client counts taps locally and calls this every few seconds with the
// increment since its last sync — never one request per tap.
export async function syncJapa(req, res) {
  try {
    const { mantraId, date, increment } = req.body;
    if (!mantraId || !date || !increment || increment <= 0) {
      return res.status(400).json({ error: "mantraId, date and a positive increment are required" });
    }
    const log = await JapaLog.findOneAndUpdate(
      { userId: req.userId, mantraId, date },
      { $inc: { count: increment } },
      { upsert: true, new: true }
    );
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: "Sync failed" });
  }
}

export async function resetJapa(req, res) {
  try {
    const { mantraId, date } = req.body;
    if (!mantraId || !date) {
      return res.status(400).json({ error: "mantraId and date are required" });
    }
    const log = await JapaLog.findOneAndUpdate(
      { userId: req.userId, mantraId, date },
      { $set: { count: 0 } },
      { upsert: true, new: true }
    );
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: "Reset failed" });
  }
}

export async function getTodayCount(req, res) {
  const { mantraId, date } = req.query;
  if (!mantraId || !date) {
    return res.status(400).json({ error: "mantraId and date are required" });
  }
  const log = await JapaLog.findOne({ userId: req.userId, mantraId, date });
  res.json({ count: log ? log.count : 0 });
}

export async function getStats(req, res) {
  const logs = await JapaLog.find({ userId: req.userId });
  const total = logs.reduce((sum, l) => sum + l.count, 0);
  const activeDays = new Set(logs.filter((l) => l.count > 0).map((l) => l.date)).size;
  const averagePerDay = activeDays ? Math.round(total / activeDays) : 0;
  const bestDay = logs.reduce((max, l) => Math.max(max, l.count), 0);
  res.json({ total, activeDays, averagePerDay, bestDay });
}

export async function getWeeklyStats(req, res) {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "startDate and endDate are required" });
  }
  const logs = await JapaLog.find({
    userId: req.userId,
    date: { $gte: startDate, $lte: endDate },
  });
  const byDate = {};
  for (const log of logs) {
    byDate[log.date] = (byDate[log.date] || 0) + log.count;
  }
  res.json({ startDate, endDate, byDate });
}
