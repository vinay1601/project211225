import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/atoms/PropertyCard";

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Properties for Sale
        </h1>
        <p className="text-muted-foreground">
          Browse premium real estate listings
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <PropertyCard key={p._id} p={p} />
        ))}
      </div>
    </main>
  );
}
