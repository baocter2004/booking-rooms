import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Calendar,
  DoorOpen,
  Users,
  ClipboardList,
  MessageSquare,
  Bell,
  Settings,
  UserCog,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface StaffSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function StaffSidebar({ isCollapsed = false, onToggle }: StaffSidebarProps) {
  const location = useLocation();

  const menuGroups = [
    {
      title: 'Main',
      items: [
        { title: 'Dashboard', href: '/staff/dashboard', icon: LayoutDashboard },
        { title: 'My Schedule', href: '/staff/schedule', icon: Calendar },
      ],
    },
    {
      title: 'Tasks',
      items: [
        { title: 'Room Management', href: '/staff/rooms', icon: DoorOpen },
        { title: 'Check-ins', href: '/staff/checkins', icon: ClipboardList, badge: '3' },
        { title: 'Bookings', href: '/staff/bookings', icon: Calendar },
        { title: 'Guests', href: '/staff/guests', icon: Users },
      ],
    },
    {
      title: 'Communication',
      items: [
        { title: 'Messages', href: '/staff/messages', icon: MessageSquare, badge: '2' },
        { title: 'Notifications', href: '/staff/notifications', icon: Bell },
      ],
    },
    {
      title: 'Other',
      items: [
        { title: 'Settings', href: '/staff/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        'relative flex h-screen flex-col border-r bg-card text-card-foreground transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-6 z-20 h-6 w-6 rounded-full border bg-background shadow-md"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* Brand */}
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <UserCog className={cn('h-6 w-6 text-primary', isCollapsed && 'mx-auto')} />
        {!isCollapsed && <span className="text-lg font-semibold">Staff Portal</span>}
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
                  <Link key={itemIndex} to={item.href} title={isCollapsed ? item.title : ''}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full gap-3',
                        isActive && 'bg-primary/10 text-primary hover:bg-primary/20',
                        isCollapsed ? 'justify-center px-2' : 'justify-start'
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
            {groupIndex < menuGroups.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </nav>
    </aside>
  );
}

