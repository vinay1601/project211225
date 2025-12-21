import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PropertyCard({ p }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
      {/* Image */}
      <img
        src={p.images?.[0] || "/placeholder.jpg"}
        alt={p.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        {/* Title */}
        <h2 className="font-semibold text-lg line-clamp-2">
          {p.title}
        </h2>

        {/* ✅ LOCATION (FIXED) */}
        <p className="text-sm text-gray-600">
          {p.location?.community}, {p.location?.emirate}
        </p>

        {/* Price */}
        <p className="text-base font-bold text-indigo-600">
          AED {p.price?.toLocaleString()}
        </p>

        {/* Meta */}
        <div className="text-xs text-gray-500 flex gap-3">
          <span>{p.bedrooms} Beds</span>
          <span>{p.bathrooms} Baths</span>
          <span>{p.builtupArea} sqft</span>
        </div>

        {/* Agent */}
        <p className="text-xs text-gray-500">
          Agent: {p.agent?.name}
        </p>
      </div>
    </div>
  );
}
