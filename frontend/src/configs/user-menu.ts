import { Calendar, CreditCard, Heart, Home, MapPin, Search, Settings, User } from 'lucide-react';

export const userMenuGroups = [
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
      { title: 'My Bookings', href: '/user/bookings', icon: Calendar, badge: '5' },
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
