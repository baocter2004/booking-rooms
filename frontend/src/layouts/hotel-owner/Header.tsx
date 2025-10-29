import { Bell, LogOut, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useNavigate } from 'react-router-dom';

interface HotelOwnerHeaderProps {
  title?: string;
}

export function HotelOwnerHeader({ title }: HotelOwnerHeaderProps) {
  const { toggleMobile } = useSidebarStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    localStorage.removeItem('hotel_owner_token');
    navigate('/hotel-owner/login');
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobile}>
        <Menu className="h-5 w-5" />
      </Button>

      {title && <h1 className="text-lg font-semibold">{title}</h1>}

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-2 p-2">
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">New booking received</p>
                <p className="text-xs text-muted-foreground">Grand Ocean Hotel - 2 hours ago</p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Staff member added</p>
                <p className="text-xs text-muted-foreground">Mountain View Resort - 5 hours ago</p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-xs text-muted-foreground">owner@hotel.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/hotel-owner/settings')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

