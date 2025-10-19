import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/libs/axios';
import { toast } from 'sonner';

export interface BaseUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: BaseUser;
    token: string;
  };
}

export interface BaseAuthConfig {
  loginEndpoint: string;
  logoutEndpoint: string;
  profileEndpoint: string;
  tokenKey: string;
  userKey: string;
  loginRoute: string;
  dashboardRoute: string;
}

export interface UseBaseAuthReturn {
  user: BaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useBaseAuth = (config: BaseAuthConfig): UseBaseAuthReturn => {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const login = async (data: any): Promise<void> => {
    try {
      setIsLoading(true);
      
      const response = await api.post<LoginResponse>(config.loginEndpoint, data);
      
      if (response.data.success) {
        const { user: authUser, token } = response.data.data;
        
        localStorage.setItem(config.tokenKey, token);
        localStorage.setItem(config.userKey, JSON.stringify(authUser));
        
        setUser(authUser);
        
        toast.success('Login successful!', {
          description: `Welcome back, ${authUser.name}`,
        });
        navigate(config.dashboardRoute);
      } else {
        toast.error('Login failed', {
          description: response.data.message || 'Please check your credentials',
        });
        throw new Error(response.data.message || 'Login Failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      toast.error('Login failed', {
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem(config.tokenKey);
      if (token) {
        await api.post(config.logoutEndpoint);
      }
    } catch (error: any) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem(config.tokenKey);
      localStorage.removeItem(config.userKey);
      setUser(null);
      
      toast.success('Logout successful!', {
        description: 'See you next time!',
      });
      
      navigate(config.loginRoute);
      setIsLoading(false);
    }
  };

  const checkAuth = async (): Promise<void> => {
    try {
      const token = localStorage.getItem(config.tokenKey);
      const storedUser = localStorage.getItem(config.userKey);
      
      if (token && storedUser) {
        const response = await api.get(config.profileEndpoint);
        
        if (response.data.success) {
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem(config.tokenKey);
          localStorage.removeItem(config.userKey);
          setUser(null);
          toast.warning('Session expired', {
            description: 'Please login again',
          });
        }
      }
    } catch (error) {
      localStorage.removeItem(config.tokenKey);
      localStorage.removeItem(config.userKey);
      setUser(null);
      toast.warning('Session expired', {
        description: 'Please login again',
      });
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
};
