import { useState } from 'react';
import { UserSidebar } from './Sidebar';
import { UserHeader } from './Header';
import { cn } from '@/libs/utils';

interface UserLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function UserLayout({ children, title, className }: UserLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <UserSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <UserHeader title={title} />
        <main className={cn('flex-1 overflow-y-auto bg-background p-6', className)}>
          {children}
        </main>
      </div>
    </div>
  );
}

