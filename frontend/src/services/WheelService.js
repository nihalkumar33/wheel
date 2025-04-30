import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api/wheel',
  withCredentials: true
});


export const createSlice = (data) => API.post('/', data);
export const deleteSlice = (id) => API.delete(`/${id}`);
export const spinWheel = () => API.get('/spin');

export const getAllSlices = async () => {
  try {
    const res = await API.get('/'); // use API, not axios
    return res.data.data; // safely return the data array
  } catch (err) {
    console.error('Failed to fetch slices:', err);
    return [];
  }
};

