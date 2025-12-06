const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function fetchSales(params) {
  const url = new URL(`${API_BASE}/api/sales`);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      if (!value.length) return;
      value.forEach((v) => url.searchParams.append(key, v));
    } else {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("Failed to fetch sales data");
  }

  return res.json();
}
