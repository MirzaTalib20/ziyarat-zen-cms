"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { PublicLayout } from "@/components/public/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import package_home from "@/assets/about/about-home.png"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type ZiyaratPackage = Tables<"packages">;

export const Packages = () => {
  const [packages, setPackages] = useState<ZiyaratPackage[]>([]);
  const [filtered, setFiltered] = useState<ZiyaratPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [destination, setDestination] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("packages").select("*");
      if (error) {
        setError(error.message);
        setPackages([]);
      } else if (data) {
        setPackages(data as ZiyaratPackage[]);
        setFiltered(data as ZiyaratPackage[]);
      }
      setLoading(false);
    };
    fetchPackages();
  }, []);

  // Filter logic
  useEffect(() => {
    let filteredList = [...packages];
    if (destination !== "all") {
      filteredList = filteredList.filter(
        (pkg) =>
          pkg.category?.toLowerCase().includes(destination.toLowerCase()) ||
          pkg.title?.toLowerCase().includes(destination.toLowerCase())
      );
    }
    if (duration !== "all") {
      filteredList = filteredList.filter((pkg) =>
        pkg.duration?.toLowerCase().includes(duration.toLowerCase())
      );
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      filteredList = filteredList.filter((pkg) => pkg.price <= max);
    }
    setFiltered(filteredList);
  }, [destination, duration, maxPrice, packages]);

  // Loading / Error states
  if (loading) {
    return (
      <PublicLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-xl font-medium text-slate-600">
            Loading Packages...
          </p>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-red-500">
          <h2 className="text-2xl font-semibold">Failed to load packages</h2>
          <p className="mt-2">{error}</p>
        </div>
      </PublicLayout>
    );
  }

  // Feature list for “What’s Included”
  const features = [
    { id: 1, icon: "🧭", title: "Experienced Guides" },
    { id: 2, icon: "🍽️", title: "Halal Meals" },
    { id: 3, icon: "⏰", title: "24/7 Support" },
    { id: 4, icon: "🏨", title: "Luxury Accommodations" },
    { id: 5, icon: "🛂", title: "Visa Assistance" },
    { id: 6, icon: "🚐", title: "Private Transport" },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section
  className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden"
  style={{
    backgroundImage: `url(${package_home})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

  {/* Content */}
  <div className="relative z-10 max-w-3xl px-6 sm:px-8">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
      Discover Your Ziyarat Packages
    </h1>

    <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 font-light tracking-wide">
      Tailored journeys of faith and comfort
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white mb-4 py-3 px-8 rounded-full shadow-lg transition-all">
        Explore Packages
      </Button>
      <Button
        variant="outline"
        className="border-white text-white hover:bg-white/10 rounded-full px-8 py-3 text-base font-medium transition"
      >
        Contact Us
      </Button>
    </div>
  </div>
</section>


      {/* Main Section */}
      <section className="bg-[#fbf7f1] py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filters */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                <SelectItem value="iran">Iran</SelectItem>
                <SelectItem value="iraq">Iraq</SelectItem>
                <SelectItem value="syria">Syria</SelectItem>
              </SelectContent>
            </Select>

            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="7 days">7 Days</SelectItem>
                <SelectItem value="10 days">10 Days</SelectItem>
                <SelectItem value="15 days">15 Days</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Packages Grid */}
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            Our Ziyarat Packages
          </h2>
        {filtered.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {filtered.map((pkg) => (
      <Card
        key={pkg._id}
        className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
      >
        {/* Image */}
        <div className="relative aspect-[16/9]">
  <img
    src={pkg.imageUrl || "/placeholder.jpg"}
    alt={pkg.title}
    className="w-full h-full object-cover"
  />
</div>


        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">
            {pkg.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {pkg.category} • {pkg.duration}
          </p>
          <p className="text-[#c2a25e] font-semibold text-lg mt-3">
            ₹{pkg.price.toLocaleString()}
          </p>
          <div className="mt-auto flex justify-end">
            <Button className="bg-[#c2a25e] hover:bg-[#b3904e] text-white rounded-full px-6 py-2">
              Book Now
            </Button>
          </div>
        </div>
      </Card>
    ))}
  </div>
) : (
  <p className="text-center text-slate-500 mt-8">
    No packages found for selected filters.
  </p>
)}

          {/* What's Included Section */}
          <div className="mt-20">
            <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
              What’s Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="text-3xl bg-[#f6efe1] w-12 h-12 flex items-center justify-center rounded-full">
                    {f.icon}
                  </div>
                  <p className="text-slate-700 font-medium">{f.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inline Theme */}
      
    </PublicLayout>
  );
};
