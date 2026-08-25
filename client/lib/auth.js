export function saveSession(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn() {
  return typeof window !== "undefined" && !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// Guest counts live here until the user registers/logs in.
// Shape: { "<mantraId>": { "<date>": count } }
export function getGuestCounts() {
  const raw = localStorage.getItem("guestCounts");
  return raw ? JSON.parse(raw) : {};
}

export function addGuestCount(mantraId, amount) {
  const counts = getGuestCounts();
  const date = todayKey();
  counts[mantraId] = counts[mantraId] || {};
  counts[mantraId][date] = (counts[mantraId][date] || 0) + amount;
  localStorage.setItem("guestCounts", JSON.stringify(counts));
  return counts[mantraId][date];
}

export function resetGuestCount(mantraId) {
  const counts = getGuestCounts();
  const date = todayKey();
  if (counts[mantraId]) {
    counts[mantraId][date] = 0;
    localStorage.setItem("guestCounts", JSON.stringify(counts));
  }
}

// Call once, right after login/register, to push any guest progress
// into the new account instead of losing it.
export async function migrateGuestCounts(api) {
  const counts = getGuestCounts();
  const mantraIds = Object.keys(counts);
  for (const mantraId of mantraIds) {
    const dates = Object.keys(counts[mantraId]);
    for (const date of dates) {
      const increment = counts[mantraId][date];
      if (increment > 0) {
        await api.syncJapa({ mantraId, date, increment });
      }
    }
  }
  localStorage.removeItem("guestCounts");
}
