// lib/api.js
export async function getProperties({
  limit = 12,
  cursor = null,
  signal,
} = {}) {
  const url = new URL(
    "https://project211225.onrender.com/api/properties"
  );

  url.searchParams.set("limit", limit);
  if (cursor) url.searchParams.set("cursor", cursor);

  const res = await fetch(url.toString(), {
    cache: "no-store",
    signal,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  return res.json();
}


/******************************************************************************************* */
// export async function getProperties(page = 1, limit = 12, signal) {
//   const res = await fetch(
//     `https://project211225.onrender.com/api/properties?page=${page}&limit=${limit}`,
//     { cache: "no-store", signal }
//   );
//   return res.json();
// }
  //**************************working on the 24/12/25 7:09******************************** */

// export async function getProperties(page = 1, limit = 12) {
//   const res = await fetch(
//     `https://project211225.onrender.com/api/properties?page=${page}&limit=${limit}`,
//     { cache: "no-store" }
//   );
//   return res.json();
// }


// export async function getProperties() {
//   const res = await fetch(
//     "https://project211225.onrender.com/api/properties",
//     { cache: "no-store" }
//   );
//   return res.json();
// }
