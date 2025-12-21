"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useState, useCallback } from "react";

export default function PropertyCard({ p }) {
  const images = p.images?.length ? p.images : ["/placeholder.jpg"];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  if (emblaApi) emblaApi.on("select", onSelect);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((img, i) => (
              <div key={i} className="flex-[0_0_100%]">
                <img
                  src={img}
                  alt={p.title}
                  className="h-48 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 w-2 rounded-full ${
                selected === i ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="font-semibold text-lg line-clamp-2">{p.title}</h2>

        <p className="text-sm text-gray-600">
          {p.location?.community}, {p.location?.emirate}
        </p>

        <p className="text-base font-bold text-indigo-600">
          AED {p.price?.toLocaleString()}
        </p>

        <div className="text-xs text-gray-500 flex gap-3">
          <span>{p.bedrooms} Beds</span>
          <span>{p.bathrooms} Baths</span>
          <span>{p.builtupArea} sqft</span>
        </div>

        <p className="text-xs text-gray-500">
          Agent: {p.agent?.name}
        </p>
      </div>
    </div>
  );
}


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
