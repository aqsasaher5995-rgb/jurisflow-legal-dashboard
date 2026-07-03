import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setToken(storedToken);
          setIsAuthenticated(true);
        } catch (e) {
          console.error('Failed to parse user data');
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.success) {
        const { user, token, refreshToken } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${user.name}! 👋`);
        return { success: true, user };
      }
      return { success: false, error: response.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.success) {
        const { user, token, refreshToken } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
        toast.success('Registration successful! 🎉');
        return { success: true, user };
      }
      return { success: false, error: response.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore logout errors
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    window.location.href = '/login';
  };

  // Update profile
  const updateProfile = async (data) => {
    try {
      const response = await api.put('/auth/profile', data);
      if (response.success) {
        const updatedUser = { ...user, ...response.user };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
        return { success: true, user: updatedUser };
      }
      return { success: false, error: response.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Change password
  const changePassword = async (data) => {
    try {
      const response = await api.put('/auth/change-password', data);
      if (response.success) {
        toast.success('Password changed successfully!');
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user) return 'G';
    if (user.name) {
      const parts = user.name.split(' ');
      if (parts.length >= 2) {
        return parts[0][0] + parts[1][0];
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    return user.email?.substring(0, 2).toUpperCase() || 'U';
  };

  // Get display name
  const getDisplayName = () => {
    if (!user) return 'Guest';
    return user.name || user.email || 'User';
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    getUserInitials,
    getDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};