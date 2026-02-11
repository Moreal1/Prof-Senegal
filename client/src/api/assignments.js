import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');
const headers = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const getAssignments = () => axios.get(`${API_URL}/assignments`, headers());
export const getAssignmentById = (id) => axios.get(`${API_URL}/assignments/${id}`, headers());
export const createAssignment = (data) => axios.post(`${API_URL}/assignments`, data, headers());
export const updateAssignment = (id, data) => axios.put(`${API_URL}/assignments/${id}`, data, headers());
export const deleteAssignment = (id) => axios.delete(`${API_URL}/assignments/${id}`, headers());