import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { hotelOwnerMenuGroups } from '@/configs/hotel-owner-menu';
import { useSidebarStore } from '@/stores/useSidebarStore';

export function HotelOwnerSidebar() {
  const location = useLocation();
  const { isCollapsed, isMobileOpen, isMobile, toggleCollapse, toggleMobile, closeMobile, getShouldCollapse } = useSidebarStore();

  const shouldCollapse = getShouldCollapse();

  const handleToggle = () => {
    if (isMobile) {
      toggleMobile();
    } else {
      toggleCollapse();
    }
  };

  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={closeMobile} />}
      <aside
        className={cn(
          'relative z-20 flex h-screen flex-col border-r bg-card text-card-foreground transition-all duration-300',
          shouldCollapse ? 'w-16' : 'w-64',
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border bg-background shadow-md"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <Building2 className={cn('h-6 w-6 text-blue-600', shouldCollapse && 'mx-auto')} />
          {!shouldCollapse && <span className="text-lg font-semibold">Hotel Owner</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4 overflow-y-auto p-2">
          {hotelOwnerMenuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {!shouldCollapse && group.title && (
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.href);
                  return (
                    <Link key={itemIndex} to={item.href} onClick={closeMobile}>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full',
                          shouldCollapse ? 'justify-center px-0' : 'justify-start px-3',
                          isActive && 'bg-accent text-accent-foreground'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {!shouldCollapse && <span className="ml-3">{item.title}</span>}
                        {!shouldCollapse && item.badge && (
                          <span className="ml-auto rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

