import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface LoginCredentials {
  clientId: string;
  abi: string;
  password: string;
}

export interface Account {
  accountId: string;
  abi: string;
  accountType: string;
  accountNumber: string;
  status: string;
  iban: string;
  balance: number;
}

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/login', credentials);
  const token = response.data.token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  }
  return response.data;
};

export const getAccounts = async () => {
  const response = await api.get('/accounts');
  return response.data;
};

export const getAccountBalance = async (accountId: string) => {
  const response = await api.get(`/accounts/${accountId}/balance`);
  return response.data;
};

export const getTotalBalance = async (): Promise<number> => {
  const accounts = await getAccounts();
  return accounts.reduce((total, account) => total + (account.balance || 0), 0);
};

// Interceptor per gestire il token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor per gestire gli errori
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
