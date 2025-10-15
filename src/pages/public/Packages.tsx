import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Packages = () => {
  const packages = useSelector((state: RootState) => state.packages.packages);

  return (
    <PublicLayout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Our Ziyarat Packages
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully curated spiritual tours to the holiest sites in Iran and Iraq
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className="overflow-hidden shadow-soft hover:shadow-glow transition-smooth group animate-fade-in"
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
    </PublicLayout>
  );
};
