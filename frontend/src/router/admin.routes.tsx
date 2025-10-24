import { Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminLogin } from '@/pages/admin/auth/Login';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { HotelList, HotelDetail, HotelCreate, HotelEdit } from '@/pages/admin/hotels';
import { AdminLayout } from '@/layouts/admin/AdminLayout';

export const adminRoutes = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Dashboard">
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/analytics"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Analytics">
            <div>Analytics Page (Coming Soon)</div>
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/hotels"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Hotels Management">
            <HotelList />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/hotels/create"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Create Hotel">
            <HotelCreate />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/hotels/:id"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Hotel Details">
            <HotelDetail />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/hotels/:id/edit"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Edit Hotel">
            <HotelEdit />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/rooms"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Rooms Management">
            <div>Rooms Page (Coming Soon)</div>
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/bookings"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Bookings">
            <div>Bookings Page (Coming Soon)</div>
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Users Management">
            <div>Users Page (Coming Soon)</div>
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/staff"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Staff Management">
            <div>Staff Page (Coming Soon)</div>
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/payments"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Payments">
            <div>Payments Page (Coming Soon)</div>
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/reviews"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Reviews">
            <div>Reviews Page (Coming Soon)</div>
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/permissions"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Permissions">
            <div>Permissions Page (Coming Soon)</div>
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/settings"
      element={
        <ProtectedRoute allowedRoles={['admin']} currentRole="admin">
          <AdminLayout title="Settings">
            <div>Settings Page (Coming Soon)</div>
          </AdminLayout>
        </ProtectedRoute>
      }
    />
  </>
);

