import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { adminRoutes } from './admin.routes';
import { staffRoutes } from './staff.routes';
import { userRoutes } from './user.routes';
import ScrollToTop from '../components/ui/top';

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/staff" element={<Navigate to="/staff/login" replace />} />

        {adminRoutes}

        {staffRoutes}

        {userRoutes}

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
