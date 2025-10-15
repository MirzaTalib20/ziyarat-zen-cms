import { ReactNode } from 'react';
import { CMSSidebar } from './CMSSidebar';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CMSLayoutProps {
  children: ReactNode;
  title: string;
  onSave?: () => void;
}

export const CMSLayout = ({ children, title, onSave }: CMSLayoutProps) => {
  return (
    <div className="min-h-screen flex w-full bg-muted">
      <CMSSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-muted transition-smooth">
              <User className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <Button 
              onClick={onSave}
              className="gradient-primary text-white hover:shadow-glow transition-smooth"
            >
              Save Changes
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
