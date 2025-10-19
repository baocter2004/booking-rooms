import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBaseAuth, type BaseUser } from '@/hooks/common/useBaseAuth';
import { API_USER_LOGIN, API_USER_LOGOUT, API_USER_PROFILE, API_USER_REGISTER } from '@/utils/constants/api-url';
import { toast } from 'sonner';
import api from '@/libs/axios';
import type { UserLoginFormData, UserRegisterFormData } from '@/validates/common/authSchema';

interface UseUserAuthReturn {
  user: BaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: UserLoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  register: (data: UserRegisterFormData) => Promise<void>;
}

export const useUserAuth = (): UseUserAuthReturn => {
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const navigate = useNavigate();
  
  const baseAuth = useBaseAuth({
    loginEndpoint: API_USER_LOGIN,
    logoutEndpoint: API_USER_LOGOUT,
    profileEndpoint: API_USER_PROFILE,
    tokenKey: 'user_token',
    userKey: 'user_user',
    loginRoute: '/user/login',
    dashboardRoute: '/user/dashboard',
  });

  const register = async (data: UserRegisterFormData): Promise<void> => {
    try {
      setIsRegisterLoading(true);
      
      const response = await api.post(API_USER_REGISTER, data);
      
      if (response.data.success) {
        toast.success('Registration successful!', {
          description: 'Please login with your credentials',
        });
        navigate('/user/login');
      } else {
        toast.error('Registration failed', {
          description: response.data.message || 'Please check your information',
        });
        throw new Error(response.data.message || 'Registration Failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      toast.error('Registration failed', {
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return {
    user: baseAuth.user,
    isLoading: baseAuth.isLoading || isRegisterLoading,
    isAuthenticated: baseAuth.isAuthenticated,
    login: baseAuth.login,
    logout: baseAuth.logout,
    checkAuth: baseAuth.checkAuth,
    register,
  };
};
