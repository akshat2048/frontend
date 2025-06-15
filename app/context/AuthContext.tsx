import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  bearerToken: string | null;
  setBearerToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isBrowser = typeof window !== 'undefined';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [bearerToken, setBearerToken] = useState<string | null>(() => {
    if (isBrowser) {
      return localStorage.getItem('bearerToken');
    }
    return null;
  });

  const updateBearerToken = (token: string | null) => {
    setBearerToken(token);
    if (isBrowser && token) {
      localStorage.setItem('bearerToken', token);
    } else {
      localStorage.removeItem('bearerToken');
    }
  };

  return (
    <AuthContext.Provider value={{ bearerToken, setBearerToken: updateBearerToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 