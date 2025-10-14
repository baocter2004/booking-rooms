import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  Search,
  Calendar,
  Heart,
  User,
  CreditCard,
  MapPin,
  Settings,
  Hotel,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface UserSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function UserSidebar({ isCollapsed = false, onToggle }: UserSidebarProps) {
  const location = useLocation();

  const menuGroups = [
    {
      title: 'Explore',
      items: [
        { title: 'Home', href: '/user/home', icon: Home },
        { title: 'Search Hotels', href: '/user/search', icon: Search },
        { title: 'Browse Locations', href: '/user/locations', icon: MapPin },
      ],
    },
    {
      title: 'My Account',
      items: [
        { title: 'My Bookings', href: '/user/bookings', icon: Calendar },
        { title: 'Favorites', href: '/user/favorites', icon: Heart },
        { title: 'Payment Methods', href: '/user/payments', icon: CreditCard },
      ],
    },
    {
      title: 'Profile',
      items: [
        { title: 'My Profile', href: '/user/profile', icon: User },
        { title: 'Settings', href: '/user/settings', icon: Settings },
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
        <Hotel className={cn('h-6 w-6 text-primary', isCollapsed && 'mx-auto')} />
        {!isCollapsed && <span className="text-lg font-semibold">Booking System</span>}
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
                      {!isCollapsed && <span className="flex-1 text-left">{item.title}</span>}
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

