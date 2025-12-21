import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PropertyCard({ p }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition">
      <img
        src={p.images?.[0] || "/placeholder.jpg"}
        alt={p.title}
        className="h-48 w-full object-cover"
      />

      <CardContent className="p-4 space-y-2">
        <h2 className="font-semibold text-lg line-clamp-1">
          {p.title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {p.location}
        </p>

        <p className="text-green-600 font-bold text-lg">
          AED {p.price?.toLocaleString()}
        </p>

        <div className="flex gap-2 pt-2">
          <Badge variant="secondary">🛏 {p.bedrooms}</Badge>
          <Badge variant="secondary">🛁 {p.bathrooms}</Badge>
          <Badge variant="secondary">📐 {p.size} sqft</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
