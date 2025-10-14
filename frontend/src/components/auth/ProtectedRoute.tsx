import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  currentRole?: string;
}

export function ProtectedRoute({ children, allowedRoles, currentRole }: ProtectedRouteProps) {
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && currentRole && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

