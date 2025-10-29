import { HotelOwnerSidebar } from './Sidebar';
import { HotelOwnerHeader } from './Header';
import { cn } from '@/libs/utils';

interface HotelOwnerLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function HotelOwnerLayout({ children, title, className }: HotelOwnerLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <HotelOwnerSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <HotelOwnerHeader title={title} />
        <main className={cn('flex-1 overflow-y-auto bg-background p-6', className)}>{children}</main>
      </div>
    </div>
  );
}

