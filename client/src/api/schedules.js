import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');
const headers = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const getSchedules = () => axios.get(`${API_URL}/schedules`, headers());
export const getScheduleById = (id) => axios.get(`${API_URL}/schedules/${id}`, headers());
export const createSchedule = (data) => axios.post(`${API_URL}/schedules`, data, headers());
export const updateSchedule = (id, data) => axios.put(`${API_URL}/schedules/${id}`, data, headers());
export const deleteSchedule = (id) => axios.delete(`${API_URL}/schedules/${id}`, headers());