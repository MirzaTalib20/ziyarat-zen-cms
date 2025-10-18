"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PublicLayout } from "@/components/public/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import heroImage from "@/assets/hero-shrine.jpg";
import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import about_circle from "@/assets/about/about-circle.png";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types"; // ← adjust the path if needed
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"
type ZiyaratPackage = Tables<"packages">;
type Destination = Tables<"destinations">;
const karbalaImage =
  "https://images.unsplash.com/photo-1613931641323-383133535905?q=80&w=1935&auto=format&fit=crop";
const najafImage =
  "https://images.unsplash.com/photo-1604217294248-b4b0e1291849?q=80&w=2070&auto=format&fit=crop";
const mashhadImage =
  "https://images.unsplash.com/photo-1582883901363-2489c6d3663a?q=80&w=1974&auto=format&fit=crop";


const destinations = [
  { name: "Karbala", image: karbalaImage },
  { name: "Najaf", image: najafImage },
  { name: "Mashhad", image: mashhadImage },
];

export const Home = () => {
  const hero = useSelector((state: RootState) => state.home.hero);
  const testimonials = useSelector(
    (state: RootState) => state.home.testimonials
  );
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<ZiyaratPackage[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*").eq("featured", true);
      if (error) {
        setError(error);
        return;
      }
      if (data) {
        setPackages(data);
      }
    };
setLoading(false);
    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase.from("destinations").select("*");
      if (error) {
        console.error("Error fetching destinations:", error);
      } else {
        setDestinations(data || []);
      }
    };
    fetchDestinations();
  }, []);
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: true,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
   const [destinationemblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  return (
    <PublicLayout>
       {/* Hero Section */}
       <div className="">
      <section className="relative flex items-center justify-center min-h-screen text-center bg-cover bg-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80  z-0" />

        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            A Spiritual Journey to Iran & Iraq
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4 mb-8 opacity-90 animate-fade-in">
            Experience peace, comfort, and faith with Ar Rahman Tour
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center animate-fade-in">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-white mb-4 py-3 px-8 rounded-full shadow-lg transition-all"
            >
              View Packages
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white rounded-full backdrop-blur-sm bg-white/10 hover:bg-white hover:text-amber-700 transition-colors py-3 px-8"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="bg-white py-20 md:py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
              About Ar Rahman Tour
            </h2>
            <h6 className="text-xl md:text-1xl font-sans font-bold text-gray-600 dir-rtl">
              الرحمن ٹور کے بارے میں
            </h6>
            <p className="text-gray-600 leading-relaxed">
              Ar-Rahman Tour is founded by <b>(Maulana) Ata Haider Rizvi </b>, a
              prominent religious leader and a volunteer for past twenty years,
              who has been actively engaged in organising Umrah and Ziarat
              Groups with core focus of serving community. The task force of the
              team is geared to offer the best of services to muslim holy lands
              and islamic historical places to our cherished guests with the aim
              of making their holidays memorable.
            </p>
            <Link to="/about" className="">
            <Button className="bg-gradient-to-br mt-4 from-yellow-500 to-amber-600 text-white rounded-full shadow-lg hover:shadow-xl hover:from-yellow-600 hover:to-amber-700 transition-all px-8">
              Learn More
            </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src={about_circle}
              alt="Smiling group of travelers"
              className="rounded-full w-80 h-80 md:w-96 md:h-96 object-cover shadow-2xl border-8 border-white"
            />
          </div>
        </div>
      </section>
      {/* Packages Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gray-800">
              Popular Ziyarat Packages
            </h2>
              <h6 className="text-xl md:text-1xl font-sans font-bold text-gray-600 dir-rtl">
             پاپولر زیارت پاکگریس </h6>
           
          </div>
          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading packages...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {packages.map((pkg) => (
                <Card
                  key={pkg._id}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 group rounded-xl border border-muted bg-white"
                >
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-serif font-semibold text-primary">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {pkg.location}
                    </p>

                    <div className="flex items-center justify-between pt-4">
                      <p className="text-xl font-bold text-yellow-600">
                        ₹{pkg.price}
                      </p>
                      <Button className="gradient-primary text-white rounded-full px-5 py-2 text-sm shadow-md">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    <section className="bg-white py-20 md:py-28">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
        Explore Ziyarat Destinations
      </h2>
        <h6 className="text-xl md:text-1xl font-sans font-bold text-gray-600 dir-rtl">
            زیارت کے مقامات کی تلاش کریں      </h6>
    </div>

    {/* Carousel */}
    <div className="overflow-hidden" ref={destinationemblaRef}>
      <div className="flex gap-6">
        {destinations.map((dest) => (
          <Link
            to="/gallery"
            state={{ destinationId: dest.categories, title: dest.title }}
            key={dest._id}
            className="
              flex-[0_0_100%]
              sm:flex-[0_0_48%]
              lg:flex-[0_0_30%]
              relative rounded-xl overflow-hidden shadow-lg group cursor-pointer
              shrink-0
            "
          >
            <img
              src={dest.imagebase64}
              alt={dest.title}
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <h3 className="absolute bottom-6 left-6 text-2xl font-serif font-bold text-white">
              {dest.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>

            {/* Testimonials */}     {" "}
      <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Pilgrim Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from those who've experienced spiritual transformation
          </p>
        </div>

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(35%-1rem)] snap-center p-2"
              >
                <Card className="p-6 shadow-soft h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Verified Pilgrim
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
     </div>
         {" "}
    </PublicLayout>
  );
};
