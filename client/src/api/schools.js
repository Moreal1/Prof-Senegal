import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');
const headers = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const getSchools = () => axios.get(`${API_URL}/schools`, headers());
export const getSchoolById = (id) => axios.get(`${API_URL}/schools/${id}`, headers());
export const createSchool = (data) => axios.post(`${API_URL}/schools`, data, headers());
export const updateSchool = (id, data) => axios.put(`${API_URL}/schools/${id}`, data, headers());
export const deleteSchool = (id) => axios.delete(`${API_URL}/schools/${id}`, headers());