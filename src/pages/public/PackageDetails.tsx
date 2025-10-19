"use client";

import { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2, XCircle, Plus, Minus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
type ZiyaratPackage = Tables<"packages">;
// --- 1. Define type ---


export default function PackageDetails() {

  const [pkg, setPkg] = useState<ZiyaratPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(0);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  useEffect(() => {
    if (!id) return;

    const fetchPackage = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("_id", id)
        .single();

      if (error || !data) {
        setError("Package not found.");
        setPkg(null);
      } else {
        setPkg(data);
          setSelectedImage(data.imageUrl);
      }
      setLoading(false);
    };

    fetchPackage();
  }, [id]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="h-12 w-12 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-serif">{error || "Package Not Found"}</h1>
      </div>
    );
  }

  // All images array (main + optionally more images if you add a gallery field)
  const allImages = [pkg.imageUrl];

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900">{pkg.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-lg text-gray-600">
            <MapPin className="h-5 w-5 text-gray-700" />
            <span>{pkg.location}</span>
            <span className="text-gray-400">|</span>
            <span>{pkg.duration}</span>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-lg border">
                <AnimatePresence>
                  <motion.img
                    key={selectedImage}
                    src={selectedImage || ""}
                    alt="Package Image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? "border-gray-900 scale-105"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Overview */}
            <section>
              <h2 className="text-3xl font-serif font-semibold text-gray-800 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
            </section>

            {/* Itinerary Accordion */}
            {pkg.itinerary?.length > 0 && (
              <section>
                <h2 className="text-3xl font-serif font-semibold text-gray-800 mb-6">Daily Itinerary</h2>
                <div className="space-y-4">
                  {pkg.itinerary.map((item, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => setExpanded(expanded === index ? null : index)}
                        className="flex justify-between items-center w-full p-5 font-medium text-left"
                      >
                        <span className="text-lg font-serif font-semibold text-gray-900">
                          Day {index + 1}: {item}
                        </span>
                        {expanded === index ? <Minus className="h-5 w-5 text-gray-700" /> : <Plus className="h-5 w-5 text-gray-500" />}
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-5 pt-0 text-gray-700">{item}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {pkg.inclusions?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">What's Not Included</h3>
                <ul className="space-y-3">
                  {pkg.exclusions?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column (Booking) */}
          <div className="lg:col-span-1 mt-12 lg:mt-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6">
                <p className="text-gray-600 text-sm">Price starting from</p>
                <p className="text-4xl font-bold text-gray-900 mt-1">₹{pkg.price.toLocaleString()}</p>
                <p className="text-gray-600 text-sm mb-6">per person</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 text-lg font-semibold text-white bg-gray-800 rounded-full shadow-md hover:bg-gray-900 transition-all"
                >
                  Book Now
                </motion.button>
                <button className="w-full text-center mt-4 text-sm text-gray-700 hover:underline font-medium">
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
