import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import heroImage from '@/assets/hero-shrine.jpg';

export const Home = () => {
  const hero = useSelector((state: RootState) => state.home.hero);
  const testimonials = useSelector((state: RootState) => state.home.testimonials);
  const packages = useSelector((state: RootState) => state.packages.packages);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-primary/70 z-0" />
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
            {hero.headline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in">
            {hero.subheading}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            {hero.ctaButtons.map((cta) => (
              <Button
                key={cta.id}
                size="lg"
                className="gradient-primary text-white hover:shadow-glow transition-smooth px-8 py-6 text-lg"
              >
                {cta.text}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Our Sacred Journey Packages</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully curated spiritual tours to the holiest sites
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.slice(0, 3).map((pkg) => (
              <Card 
                key={pkg.id} 
                className="overflow-hidden shadow-soft hover:shadow-glow transition-smooth group"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />
                
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-semibold">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.route}</p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                      <p className="text-2xl font-bold text-primary">
                        ${pkg.price.toLocaleString()}
                      </p>
                    </div>
                    <Button className="gradient-primary text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Pilgrim Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from those who've experienced spiritual transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 shadow-soft">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">Verified Pilgrim</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
