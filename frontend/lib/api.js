export async function getProperties() {
  const res = await fetch(
    "https://YOUR_RENDER_URL/api/properties",
    { cache: "no-store" }
  );
  return res.json();
}
