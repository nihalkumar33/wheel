import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api/wheel',
});

export const getAllSlices = () => API.get('/');
export const createSlice = (data) => API.post('/', data);
export const deleteSlice = (id) => API.delete(`/${id}`);
export const spinWheel = () => API.get('/spin');
