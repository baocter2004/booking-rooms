import axios, { type AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use(
  (config) => {
    const currentPath = window.location.pathname;
    let token = null;
    
    if (currentPath.startsWith('/admin')) {
      token = localStorage.getItem('admin_token');
    } else if (currentPath.startsWith('/staff')) {
      token = localStorage.getItem('staff_token');
    } else {
      token = localStorage.getItem('user_token') || localStorage.getItem('access_token');
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const data = response?.data?.data || {};
    if (Object.keys(data)?.includes('access_token')) {
      localStorage.setItem('access_token', data?.access_token || '');
      localStorage.setItem('expires_at', data?.expires_at || '');
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      
      localStorage.removeItem('admin_token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('admin_user');
      localStorage.removeItem('staff_token');
      localStorage.removeItem('staff_user');
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_user');
      localStorage.removeItem('expires_at');
      
      if (currentPath.startsWith('/admin')) {
        window.location.href = '/admin/login';
      } else if (currentPath.startsWith('/staff')) {
        window.location.href = '/staff/login';
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const axiosGet = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const apiData = await api.get(url, config);
    return apiData?.data || {};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error?.response?.status || 500,
        data: error?.response?.data || {},
        message: 'Failed',
      };
    } else {
      return Promise.reject(error);
    }
  }
};

export const axiosPost = async (url: string, data?: object, config?: AxiosRequestConfig) => {
  try {
    const apiData = await api.post(url, data, config);
    return apiData?.data || {};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error?.response?.status || 500,
        data: error?.response?.data || {},
        message: 'Failed',
      };
    } else {
      return Promise.reject(error);
    }
  }
};

export const axiosPut = async (url: string, data?: object, config?: AxiosRequestConfig) => {
  try {
    const apiData = await api.put(url, data, config);
    return apiData?.data || {};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error?.response?.status || 500,
        data: error?.response?.data || {},
        message: 'Failed',
      };
    } else {
      return Promise.reject(error);
    }
  }
};

export const axiosDelete = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const apiData = await api.delete(url, config);
    return apiData?.data || {};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error?.response?.status || 500,
        data: error?.response?.data || {},
        message: 'Failed',
      };
    } else {
      return Promise.reject(error);
    }
  }
};

export default api;
