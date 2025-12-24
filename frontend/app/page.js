"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/atoms/PropertyCard";
import { getProperties } from "@/lib/api";

export default function PropertiesPage() {
  const [data, setData] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initial load
useEffect(() => {
  let isMounted = true;

  setLoading(true);
  getProperties({ limit: 12 })
    .then((res) => {
      if (!isMounted) return;
      setData(res.data || []);
      setCursor(res.nextCursor);
      setHasMore(Boolean(res.nextCursor));
    })
    .catch(console.error)
    .finally(() => {
      if (isMounted) setLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, []);


  // Load older data
  async function loadMore() {
    if (!hasMore || loading) return;

    const controller = new AbortController();
    setLoading(true);

    try {
      const res = await getProperties({
        limit: 12,
        cursor,
        signal: controller.signal,
      });

      setData((prev) => [...prev, ...(res.data || [])]);
      setCursor(res.nextCursor);
      setHasMore(Boolean(res.nextCursor));
    } catch (err) {
      if (err.name !== "AbortError") console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((p) => (
          <PropertyCard key={p._id} p={p} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 rounded-full bg-black text-white"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}

//*******************************************workin code******************************************************* */
// "use client";

// // import { useEffect, useState } from "react";
// import { useEffect, useState, useMemo } from "react";
// import PropertyCard from "@/components/atoms/PropertyCard";
// import { PropertySkeleton } from "@/components/atoms/PropertySkeleton";
// import { getProperties } from "@/lib/api";
// import Pagination from "@/components/molecules/Pagination";
// import PropertiesHeader from "@/components/layout/PropertiesHeader";
// import Footer from "@/components/layout/Footer";

// export default function PropertiesPage() {
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   setLoading(true);
//   //   getProperties(page).then((res) => {
//   //     setData(res.data || []);
//   //     setPagination(res.pagination || {});
//   //     setLoading(false);
//   //   });
//   // }, [page]);
//   //**************************working on the 24/12/25 7:09******************************** */
//   useEffect(() => {
//   const controller = new AbortController();
//   setLoading(true);

//   getProperties(page, 12, controller.signal)
//     .then((res) => {
//       setData(res.data || []);
//       setPagination(res.pagination || {});
//     })
//     .catch((err) => {
//       if (err.name !== "AbortError") console.error(err);
//     })
//     .finally(() => setLoading(false));

//   return () => controller.abort();
// }, [page]);

// const skeletons = useMemo(
//   () => Array.from({ length: 6 }),
//   []
// );



//   return (
//     <>
//       <PropertiesHeader />

//       <main className="max-w-7xl mx-auto px-4 mt-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading
//             ? skeletons.map((_, i) => (
//   <PropertySkeleton key={i} />
// ))

//             : data.map((p, index) => (
//                 <PropertyCard
//                   key={p._id}
//                   p={p}
//                   isFirstCard={index === 0}
//                 />
//               ))}
//         </div>

//         <Pagination
//           page={page}
//           totalPages={pagination.totalPages || 1}
//           onPageChange={setPage}
//         />
//       </main>

//       <Footer />
//     </>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import PropertyCard from "@/components/atoms/PropertyCard";
// import { getProperties } from "@/lib/api";
// import { PropertySkeleton } from "@/components/atoms/PropertySkeleton";

// export default function PropertiesPage() {
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     getProperties(page).then((res) => {
//       setData(res.data);
//       setPagination(res.pagination);
//       setLoading(false);
//     });
//   }, [page]);

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {loading
//           ? Array.from({ length: 6 }).map((_, i) => (
//               <PropertySkeleton key={i} />
//             ))
//           : data.map((p) => <PropertyCard key={p._id} p={p} />)}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-10 gap-2">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-1.5 border rounded-xl disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <button
//           disabled={page === pagination.totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-1.5 border rounded-xl disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// }



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
