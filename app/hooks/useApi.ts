import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not set in environment variables');
}

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function useApi<T>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });
  const { bearerToken } = useAuth();

  const callApi = async (endpoint: string, options?: RequestInit) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options?.headers as Record<string, string> || {}),
      };

      if (bearerToken) {
        headers['Authorization'] = `Bearer ${bearerToken}`;
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setState({ data, error: null, loading: false });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, error: errorMessage, loading: false });
      throw error;
    }
  };

  return {
    ...state,
    callApi,
  };
} 