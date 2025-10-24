import { useBaseAuth, type BaseUser } from '@/hooks/common/useBaseAuth';
import { API_ADMIN_LOGIN, API_ADMIN_LOGOUT } from '@/utils/constants/api-url';
import type { AdminLoginFormData } from '@/validates/common/authSchema';

interface UseAdminAuthReturn {
  user: BaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: AdminLoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAdminAuth = (): UseAdminAuthReturn => {
  const baseAuth = useBaseAuth({
    loginEndpoint: API_ADMIN_LOGIN,
    logoutEndpoint: API_ADMIN_LOGOUT,
    profileEndpoint: '',
    tokenKey: 'admin_token',
    userKey: 'admin_user',
    loginRoute: '/admin/login',
    dashboardRoute: '/admin/dashboard',
  });

  return {
    user: baseAuth.user,
    isLoading: baseAuth.isLoading,
    isAuthenticated: baseAuth.isAuthenticated,
    login: baseAuth.login,
    logout: baseAuth.logout,
    checkAuth: baseAuth.checkAuth,
  };
};
