import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Card } from '@/components/ui/card';

export const Gallery = () => {
  const gallery = useSelector((state: RootState) => state.gallery);

  return (
    <PublicLayout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Sacred Moments Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the spiritual beauty of our pilgrimages through these captured moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.items.map((item) => (
              <Card 
                key={item.id}
                className="overflow-hidden shadow-soft hover:shadow-glow transition-smooth group animate-fade-in"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {item.file ? (
                    item.type === 'image' ? (
                      <img 
                        src={item.file} 
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                    ) : (
                      <video 
                        src={item.file}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-4xl text-primary/40">🕌</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">{item.caption}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
