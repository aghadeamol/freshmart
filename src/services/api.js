const BASE = "/api";

export async function fetchProducts(category = "all", search = "") {
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (search) params.set("search", search);
  const res = await fetch(`${BASE}/products?${params}`);
  const json = await res.json();
  return json.data;
}

export async function placeOrder(payload) {
  const res = await fetch(`${BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}
