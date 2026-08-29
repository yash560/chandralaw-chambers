'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'counsel' | 'client';
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isAdminOrCounsel: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAdminOrCounsel: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('clc_auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('clc_auth_user');
      }
    }
  }, []);

  const login = (newUser: AuthUser) => {
    setUser(newUser);
    localStorage.setItem('clc_auth_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('clc_auth_user');
  };

  const isAdminOrCounsel = user?.role === 'admin' || user?.role === 'counsel';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdminOrCounsel }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
