import { Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { StaffLogin } from '@/pages/staff/Login';
import { StaffDashboard } from '@/pages/staff/Dashboard';
import { StaffLayout } from '@/layouts/staff/StaffLayout';

export const staffRoutes = (
  <>
    <Route path="/staff/login" element={<StaffLogin />} />
    <Route
      path="/staff/dashboard"
      element={
        <ProtectedRoute allowedRoles={['staff']} currentRole="staff">
          <StaffLayout title="Dashboard">
            <StaffDashboard />
          </StaffLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/schedule"
      element={
        <ProtectedRoute allowedRoles={['staff']} currentRole="staff">
          <StaffLayout title="My Schedule">
            <div>Schedule Page (Coming Soon)</div>
          </StaffLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/rooms"
      element={
        <ProtectedRoute allowedRoles={['staff']} currentRole="staff">
          <StaffLayout title="Room Management">
            <div>Rooms Page (Coming Soon)</div>
          </StaffLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/checkins"
      element={
        <ProtectedRoute allowedRoles={['staff']} currentRole="staff">
          <StaffLayout title="Check-ins">
            <div>Check-ins Page (Coming Soon)</div>
          </StaffLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/bookings"
      element={
        <ProtectedRoute allowedRoles={['staff']} currentRole="staff">
          <StaffLayout title="Bookings">
            <div>Bookings Page (Coming Soon)</div>
          </StaffLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/guests"
      element={
        <ProtectedRoute allowedRoles={['staff']} currentRole="staff">
          <StaffLayout title="Guests">
            <div>Guests Page (Coming Soon)</div>
          </StaffLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/messages"
      element={
        <ProtectedRoute allowedRoles={['staff']} currentRole="staff">
          <StaffLayout title="Messages">
            <div>Messages Page (Coming Soon)</div>
          </StaffLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/notifications"
      element={
        <ProtectedRoute allowedRoles={['staff']} currentRole="staff">
          <StaffLayout title="Notifications">
            <div>Notifications Page (Coming Soon)</div>
          </StaffLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/staff/settings"
      element={
        <ProtectedRoute allowedRoles={['staff']} currentRole="staff">
          <StaffLayout title="Settings">
            <div>Settings Page (Coming Soon)</div>
          </StaffLayout>
        </ProtectedRoute>
      }
    />
  </>
);

