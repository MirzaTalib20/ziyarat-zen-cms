import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  const location = useLocation();
  const navItems = useSelector((state: RootState) => state.navigation.items);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-white text-lg font-bold">Z</span>
              </div>
              <span className="text-xl font-serif font-bold text-foreground">
                Ziyarat Tours
              </span>
            </Link>

            {/* Nav Items */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.id}
                    to={item.url}
                    className={`
                      text-sm font-medium transition-smooth relative
                      ${isActive 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-primary'
                      }
                      after:content-[''] after:absolute after:w-full after:h-0.5 
                      after:bg-primary after:bottom-[-4px] after:left-0 
                      after:transition-transform after:origin-bottom-right
                      ${isActive 
                        ? 'after:scale-x-100' 
                        : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-white text-lg font-bold">Z</span>
                </div>
                <span className="text-xl font-serif font-bold">Ziyarat Tours</span>
              </div>
              <p className="text-sm opacity-80">
                Providing spiritual journeys to sacred sites with care and reverence since 2010.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link 
                      to={item.url}
                      className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-smooth"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Email: info@ziyarattours.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>WhatsApp: +1 (555) 987-6543</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm opacity-60">
            © {new Date().getFullYear()} Ziyarat Tours. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
