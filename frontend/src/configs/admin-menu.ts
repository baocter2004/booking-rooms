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
} from 'lucide-react';

export const adminMenuGroups = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Management',
    items: [
      { title: 'Hotels', href: '/admin/hotels', icon: Hotel },
      { title: 'Rooms', href: '/admin/rooms', icon: DoorOpen },
      { title: 'Bookings', href: '/admin/bookings', icon: Calendar, badge: '5' },
      { title: 'Users', href: '/admin/users', icon: Users },
      { title: 'Staff', href: '/admin/staff', icon: UserCog },
    ],
  },
  {
    title: 'Financial',
    items: [{ title: 'Payments', href: '/admin/payments', icon: CreditCard }],
  },
  {
    title: 'System',
    items: [
      { title: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
      { title: 'Permissions', href: '/admin/permissions', icon: ShieldCheck },
      { title: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];
