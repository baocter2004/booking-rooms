import {
  LayoutDashboard,
  Hotel,
  Users,
  BarChart3,
  Settings,
  DoorOpen,
  Calendar,
} from 'lucide-react';

export const hotelOwnerMenuGroups = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', href: '/hotel-owner/dashboard', icon: LayoutDashboard },
      { title: 'Analytics', href: '/hotel-owner/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Management',
    items: [
      { title: 'My Hotels', href: '/hotel-owner/hotels', icon: Hotel },
      { title: 'Staff', href: '/hotel-owner/staff', icon: Users },
      { title: 'Bookings', href: '/hotel-owner/bookings', icon: Calendar },
    ],
  },
  {
    title: 'Account',
    items: [
      { title: 'Settings', href: '/hotel-owner/settings', icon: Settings },
    ],
  },
];

