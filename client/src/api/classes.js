import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');
const headers = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const getClasses = () => axios.get(`${API_URL}/classes`, headers());
export const getClassById = (id) => axios.get(`${API_URL}/classes/${id}`, headers());
export const createClass = (data) => axios.post(`${API_URL}/classes`, data, headers());
export const updateClass = (id, data) => axios.put(`${API_URL}/classes/${id}`, data, headers());
export const deleteClass = (id) => axios.delete(`${API_URL}/classes/${id}`, headers());