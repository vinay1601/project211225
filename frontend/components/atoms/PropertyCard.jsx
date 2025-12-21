"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { shimmer, toBase64 } from "@/lib/imagePlaceholder";

export default function PropertyCard({ p, isFirstCard = false }) {
  const images = useMemo(
    () => (p.images?.length ? p.images : ["/placeholder.jpg"]),
    [p.images]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const [loaded, setLoaded] = useState(() => images.map(() => false));

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi]);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
      {/* Image carousel */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((img, i) => (
              <div key={i} className="relative flex-[0_0_100%] h-52">
                {!loaded[i] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
                )}

                <Image
                  src={img}
                  alt={p.title}
                  fill
                  priority={isFirstCard && i === 0}
                  loading={isFirstCard && i === 0 ? "eager" : "lazy"}
                  placeholder={loaded[i] ? "empty" : "blur"}
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                         33vw"
                  className={`object-cover transition-opacity duration-300 ${
                    loaded[i] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoadingComplete={() =>
                    setLoaded((prev) => {
                      if (prev[i]) return prev;
                      const copy = [...prev];
                      copy[i] = true;
                      return copy;
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 w-2 rounded-full transition ${
                selected === i ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-4 space-y-1.5">
        <h2 className="font-semibold text-lg line-clamp-2">{p.title}</h2>

        <p className="text-sm text-gray-500">
          {p.location?.community}, {p.location?.emirate}
        </p>

        <p className="text-lg font-bold text-emerald-600">
          AED {p.price?.toLocaleString()}
        </p>

        <div className="text-xs text-gray-500 flex gap-3">
          <span>{p.bedrooms} Beds</span>
          <span>{p.bathrooms} Baths</span>
          <span>{p.builtupArea} sqft</span>
        </div>

        <p className="text-xs text-gray-400">
          Agent: {p.agent?.name}
        </p>
      </div>
    </div>
  );
}




// "use client";

// import Image from "next/image";
// import useEmblaCarousel from "embla-carousel-react";
// import { useEffect, useState, useCallback } from "react";

// export default function PropertyCard({ p }) {
//   const images = p.images?.length ? p.images : ["/placeholder.jpg"];
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
//   const [selected, setSelected] = useState(0);

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setSelected(emblaApi.selectedScrollSnap());
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     emblaApi.on("select", onSelect);
//     return () => emblaApi.off("select", onSelect);
//   }, [emblaApi, onSelect]);

//   return (
//     <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
//       {/* Carousel */}
//       <div className="relative">
//         <div ref={emblaRef} className="overflow-hidden">
//           <div className="flex">
//             {images.map((img, i) => (
//               <div key={i} className="relative flex-[0_0_100%] h-52">
//                 <Image
//                   src={img}
//                   alt={p.title}
//                   fill
//                   priority={i === 0}              // 🚀 instant first image
//                   placeholder="blur"
//                   blurDataURL="/blur.jpg"        // tiny base64 image
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Dots */}
//         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
//           {images.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => emblaApi?.scrollTo(i)}
//               className={`h-2 w-2 rounded-full transition ${
//                 selected === i ? "bg-white" : "bg-white/50"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4 space-y-1.5">
//         <h2 className="font-semibold text-lg line-clamp-2">
//           {p.title}
//         </h2>

//         <p className="text-sm text-gray-500">
//           {p.location?.community}, {p.location?.emirate}
//         </p>

//         <p className="text-lg font-bold text-emerald-600">
//           AED {p.price?.toLocaleString()}
//         </p>

//         <div className="text-xs text-gray-500 flex gap-3">
//           <span>{p.bedrooms} Beds</span>
//           <span>{p.bathrooms} Baths</span>
//           <span>{p.builtupArea} sqft</span>
//         </div>

//         <p className="text-xs text-gray-400">
//           Agent: {p.agent?.name}
//         </p>
//       </div>
//     </div>
//   );
// }


// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// export default function PropertyCard({ p }) {
//   return (
//     <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
//       {/* Image */}
//       <img
//         src={p.images?.[0] || "/placeholder.jpg"}
//         alt={p.title}
//         className="h-48 w-full object-cover"
//       />

//       <div className="p-4 space-y-2">
//         {/* Title */}
//         <h2 className="font-semibold text-lg line-clamp-2">
//           {p.title}
//         </h2>

//         {/* ✅ LOCATION (FIXED) */}
//         <p className="text-sm text-gray-600">
//           {p.location?.community}, {p.location?.emirate}
//         </p>

//         {/* Price */}
//         <p className="text-base font-bold text-indigo-600">
//           AED {p.price?.toLocaleString()}
//         </p>

//         {/* Meta */}
//         <div className="text-xs text-gray-500 flex gap-3">
//           <span>{p.bedrooms} Beds</span>
//           <span>{p.bathrooms} Baths</span>
//           <span>{p.builtupArea} sqft</span>
//         </div>

//         {/* Agent */}
//         <p className="text-xs text-gray-500">
//           Agent: {p.agent?.name}
//         </p>
//       </div>
//     </div>
//   );
// }
