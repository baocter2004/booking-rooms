import { useBaseAuth, type BaseUser } from '@/hooks/common/useBaseAuth';
import { API_STAFF_LOGIN, API_STAFF_LOGOUT, API_STAFF_PROFILE } from '@/utils/constants/api-url';
import type { StaffLoginFormData } from '@/validates/common/authSchema';

interface UseStaffAuthReturn {
  user: BaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: StaffLoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useStaffAuth = (): UseStaffAuthReturn => {
  const baseAuth = useBaseAuth({
    loginEndpoint: API_STAFF_LOGIN,
    logoutEndpoint: API_STAFF_LOGOUT,
    profileEndpoint: API_STAFF_PROFILE,
    tokenKey: 'staff_token',
    userKey: 'staff_user',
    loginRoute: '/staff/login',
    dashboardRoute: '/staff/dashboard',
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
