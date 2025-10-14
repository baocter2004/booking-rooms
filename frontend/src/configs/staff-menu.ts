import { Bell, Calendar, ClipboardList, DoorOpen, LayoutDashboard, MessageSquare, Settings, Users } from "lucide-react";

export const staffMenuGroups = [
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
    items: [{ title: 'Settings', href: '/staff/settings', icon: Settings }],
  },
];
