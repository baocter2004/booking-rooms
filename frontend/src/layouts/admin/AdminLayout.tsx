import { useState } from "react";
import { AdminSidebar } from "./Sidebar";
import { AdminHeader } from "./Header";
import { cn } from "@/libs/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function AdminLayout({ children, title, className }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader title={title} />
        <main
          className={cn("flex-1 overflow-y-auto bg-background p-6", className)}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
