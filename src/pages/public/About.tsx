import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Button } from '@/components/ui/button';

export const About = () => {
  const about = useSelector((state: RootState) => state.about);

  return (
    <PublicLayout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-soft">
                {about.image ? (
                  <img 
                    src={about.image} 
                    alt={about.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-4xl text-primary/40">🕌</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-serif font-bold">
                {about.title}
              </h1>
              <div 
                className="text-lg text-muted-foreground prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: about.description }}
              />
              <Button 
                className="gradient-primary text-white hover:shadow-glow transition-smooth"
                onClick={() => window.location.href = about.learnMore.link}
              >
                {about.learnMore.text}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
