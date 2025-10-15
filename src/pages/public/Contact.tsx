import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export const Contact = () => {
  const contact = useSelector((state: RootState) => state.contact);
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent',
      description: 'Thank you for contacting us. We will get back to you soon!',
    });
    setFormData({});
  };

  return (
    <PublicLayout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {contact.title}
            </h1>
            <div 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: contact.description }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in">
              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-serif font-semibold mb-4">Get in Touch</h3>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{contact.contactDetails.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{contact.contactDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <a 
                      href={contact.contactDetails.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>
              </Card>

              {contact.mapEmbed && (
                <Card className="p-0 overflow-hidden">
                  <div 
                    className="w-full h-64"
                    dangerouslySetInnerHTML={{ __html: contact.mapEmbed }}
                  />
                </Card>
              )}
            </div>

            {/* Contact Form */}
            <Card className="p-6 animate-fade-in">
              <h3 className="text-xl font-serif font-semibold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {contact.formFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.id}
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        required
                        className="bg-background"
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        required
                        className="bg-background"
                      />
                    )}
                  </div>
                ))}
                <Button 
                  type="submit"
                  className="w-full gradient-primary text-white hover:shadow-glow transition-smooth"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
