const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  listMantras: () => request("/mantras"),
  getMantra: (slug) => request(`/mantras/${slug}`),
  syncJapa: (body) => request("/japa/sync", { method: "POST", body: JSON.stringify(body) }),
  resetJapa: (body) => request("/japa/reset", { method: "POST", body: JSON.stringify(body) }),
  getToday: (mantraId, date) => request(`/japa/today?mantraId=${mantraId}&date=${date}`),
  getStats: () => request("/japa/stats"),
  getWeeklyStats: (startDate, endDate) => request(`/japa/stats/weekly?startDate=${startDate}&endDate=${endDate}`),
  registerDeviceToken: (body) =>
  request("/notifications/token", {
    method: "POST",
    body: JSON.stringify(body),
  }),
};
