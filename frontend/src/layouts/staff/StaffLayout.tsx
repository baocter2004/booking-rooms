import { useState } from 'react';
import { StaffSidebar } from './Sidebar';
import { StaffHeader } from './Header';
import { cn } from '@/libs/utils';

interface StaffLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function StaffLayout({ children, title, className }: StaffLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <StaffSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <StaffHeader title={title} />
        <main className={cn('flex-1 overflow-y-auto bg-background p-6', className)}>
          {children}
        </main>
      </div>
    </div>
  );
}

