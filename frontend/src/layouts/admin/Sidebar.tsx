import { Link, useLocation } from "react-router-dom";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Hotel,
  DoorOpen,
  Users,
  UserCog,
  Calendar,
  Settings,
  BarChart3,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function AdminSidebar({
  isCollapsed = false,
  onToggle,
}: AdminSidebarProps) {
  const location = useLocation();

  const menuGroups = [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      title: "Management",
      items: [
        { title: "Hotels", href: "/admin/hotels", icon: Hotel },
        { title: "Rooms", href: "/admin/rooms", icon: DoorOpen },
        {
          title: "Bookings",
          href: "/admin/bookings",
          icon: Calendar,
          badge: "5",
        },
        { title: "Users", href: "/admin/users", icon: Users },
        { title: "Staff", href: "/admin/staff", icon: UserCog },
      ],
    },
    {
      title: "Financial",
      items: [{ title: "Payments", href: "/admin/payments", icon: CreditCard }],
    },
    {
      title: "System",
      items: [
        { title: "Reviews", href: "/admin/reviews", icon: MessageSquare },
        { title: "Permissions", href: "/admin/permissions", icon: ShieldCheck },
        { title: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r bg-card text-card-foreground transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-6 z-20 h-6 w-6 rounded-full border bg-background shadow-md"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Brand */}
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <ShieldCheck
          className={cn("h-6 w-6 text-primary", isCollapsed && "mx-auto")}
        />
        {!isCollapsed && (
          <span className="text-lg font-semibold">Admin Panel</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-4 overflow-y-auto p-2">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {!isCollapsed && (
              <h4 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.title}
              </h4>
            )}
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={itemIndex}
                    to={item.href}
                    title={isCollapsed ? item.title : ""}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full gap-3",
                        isActive &&
                          "bg-primary/10 text-primary hover:bg-primary/20",
                        isCollapsed ? "justify-center px-2" : "justify-start"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          {item.badge && (
                            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {isCollapsed && item.badge && (
                        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
            {groupIndex < menuGroups.length - 1 && (
              <Separator className="mt-4" />
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
