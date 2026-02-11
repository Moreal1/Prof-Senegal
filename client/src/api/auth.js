import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
export const logout = () => localStorage.removeItem('token');
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};