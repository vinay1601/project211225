export async function getProperties(page = 1, limit = 12) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );
  return res.json();
}


// export async function getProperties() {
//   const res = await fetch(
//     "https://project211225.onrender.com/api/properties",
//     { cache: "no-store" }
//   );
//   return res.json();
// }
