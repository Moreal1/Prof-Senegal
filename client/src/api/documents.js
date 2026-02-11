import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');
const headers = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const getDocuments = () => axios.get(`${API_URL}/documents`, headers());
export const uploadDocument = (formData) =>
  axios.post(`${API_URL}/documents`, formData, {
    headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
  });
export const searchDocuments = (query) => axios.get(`${API_URL}/documents?search=${query}`, headers());
export const deleteDocument = (id) => axios.delete(`${API_URL}/documents/${id}`, headers());