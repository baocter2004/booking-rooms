import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { UserLogin } from "@/pages/user/auth/Login";
import { UserHome } from "@/pages/user/Home";
import { UserLayout } from "@/layouts/user/UserLayout";

export const userRoutes = (
  <>
    <Route path="/user/login" element={<UserLogin />} />
    <Route
      path="/user/home"
      element={
        <ProtectedRoute allowedRoles={["user"]} currentRole="user">
          <UserLayout title="Home">
            <UserHome />
          </UserLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/search"
      element={
        <ProtectedRoute allowedRoles={["user"]} currentRole="user">
          <UserLayout title="Search Hotels">
            <div>Search Page (Coming Soon)</div>
          </UserLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/locations"
      element={
        <ProtectedRoute allowedRoles={["user"]} currentRole="user">
          <UserLayout title="Browse Locations">
            <div>Locations Page (Coming Soon)</div>
          </UserLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/bookings"
      element={
        <ProtectedRoute allowedRoles={["user"]} currentRole="user">
          <UserLayout title="My Bookings">
            <div>Bookings Page (Coming Soon)</div>
          </UserLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/favorites"
      element={
        <ProtectedRoute allowedRoles={["user"]} currentRole="user">
          <UserLayout title="Favorites">
            <div>Favorites Page (Coming Soon)</div>
          </UserLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/payments"
      element={
        <ProtectedRoute allowedRoles={["user"]} currentRole="user">
          <UserLayout title="Payment Methods">
            <div>Payment Methods Page (Coming Soon)</div>
          </UserLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/profile"
      element={
        <ProtectedRoute allowedRoles={["user"]} currentRole="user">
          <UserLayout title="My Profile">
            <div>Profile Page (Coming Soon)</div>
          </UserLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/settings"
      element={
        <ProtectedRoute allowedRoles={["user"]} currentRole="user">
          <UserLayout title="Settings">
            <div>Settings Page (Coming Soon)</div>
          </UserLayout>
        </ProtectedRoute>
      }
    />
  </>
);
