export async function getProperties() {
  const res = await fetch(
    "https://project211225.onrender.com/api/properties",
    { cache: "no-store" }
  );
  return res.json();
}
