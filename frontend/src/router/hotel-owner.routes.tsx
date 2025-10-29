import { Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { HotelOwnerLogin } from '@/pages/hotel-owner/auth/Login';
import { HotelOwnerDashboard } from '@/pages/hotel-owner/Dashboard';
import { HotelOwnerHotelList } from '@/pages/hotel-owner/hotels';
import { HotelOwnerLayout } from '@/layouts/hotel-owner/HotelOwnerLayout';

export const hotelOwnerRoutes = (
  <>
    <Route path="/hotel-owner/login" element={<HotelOwnerLogin />} />
    <Route
      path="/hotel-owner/dashboard"
      element={
        <ProtectedRoute allowedRoles={['hotel_owner']} currentRole="hotel_owner">
          <HotelOwnerLayout title="Dashboard">
            <HotelOwnerDashboard />
          </HotelOwnerLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel-owner/analytics"
      element={
        <ProtectedRoute allowedRoles={['hotel_owner']} currentRole="hotel_owner">
          <HotelOwnerLayout title="Analytics">
            <div>Analytics Page (Coming Soon)</div>
          </HotelOwnerLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel-owner/hotels"
      element={
        <ProtectedRoute allowedRoles={['hotel_owner']} currentRole="hotel_owner">
          <HotelOwnerLayout title="My Hotels">
            <HotelOwnerHotelList />
          </HotelOwnerLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel-owner/staff"
      element={
        <ProtectedRoute allowedRoles={['hotel_owner']} currentRole="hotel_owner">
          <HotelOwnerLayout title="Staff Management">
            <div>Staff Page (Coming Soon)</div>
          </HotelOwnerLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel-owner/bookings"
      element={
        <ProtectedRoute allowedRoles={['hotel_owner']} currentRole="hotel_owner">
          <HotelOwnerLayout title="Bookings">
            <div>Bookings Page (Coming Soon)</div>
          </HotelOwnerLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel-owner/settings"
      element={
        <ProtectedRoute allowedRoles={['hotel_owner']} currentRole="hotel_owner">
          <HotelOwnerLayout title="Settings">
            <div>Settings Page (Coming Soon)</div>
          </HotelOwnerLayout>
        </ProtectedRoute>
      }
    />
  </>
);

