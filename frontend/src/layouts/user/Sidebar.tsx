import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Hotel, ChevronLeft, ChevronRight } from 'lucide-react';
import { userMenuGroups } from '@/configs/user-menu';
import { useSidebarStore } from '@/stores/useSidebarStore';

export function UserSidebar() {
  const location = useLocation();
  const { isCollapsed, isMobileOpen, isMobile, toggleCollapse, toggleMobile, closeMobile, getShouldCollapse } =
    useSidebarStore();
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
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="absolute -right-3 top-6 z-20 h-6 w-6 rounded-full border bg-background shadow-md"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <Hotel className={cn('h-6 w-6 text-primary', isCollapsed && 'mx-auto')} />
          {!shouldCollapse && <span className="text-lg font-semibold">Booking System</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4 overflow-y-auto p-2">
          {userMenuGroups.map((group, groupIndex) => (
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
                    <Link key={itemIndex} to={item.href} title={shouldCollapse ? item.title : ''} onClick={closeMobile}>
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={cn(
                          'w-full gap-3',
                          isActive && 'bg-primary/10 text-primary hover:bg-primary/20',
                          shouldCollapse ? 'justify-center px-2' : 'justify-start',
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!shouldCollapse && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            {item.badge && (
                              <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                        {shouldCollapse && item.badge && (
                          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>
              {groupIndex < userMenuGroups.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
