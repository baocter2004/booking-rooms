import { AdminSidebar } from './Sidebar';
import { AdminHeader } from './Header';
import { cn } from '@/libs/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function AdminLayout({ children, title, className }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader title={title} />
        <main className={cn('flex-1 overflow-y-auto bg-background p-6', className)}>{children}</main>
      </div>
    </div>
  );
}
