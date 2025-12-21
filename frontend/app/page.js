"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api";

export default function PropertiesPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    getProperties(page).then((res) => {
      setData(res.data);
      setPagination(res.pagination);
    });
  }, [page]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((p) => (
          <PropertyCard key={p._id} p={p} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(pagination.totalPages || 0)]
          .slice(0, 5)
          .map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-green-500 text-white"
                  : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}


// import { getProperties } from "@/lib/api";
// import PropertyCard from "@/components/atoms/PropertyCard";

// export default async function Home() {
//   const properties = await getProperties();

//   return (
//     <main className="container mx-auto px-6 py-10">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold tracking-tight">
//           Properties for Sale
//         </h1>
//         <p className="text-muted-foreground">
//           Browse premium real estate listings
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((p) => (
//           <PropertyCard key={p._id} p={p} />
//         ))}
//       </div>
//     </main>
//   );
// }
