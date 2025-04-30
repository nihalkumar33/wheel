import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/auth/wheel", // or wherever your backend is
  withCredentials: true, // so cookies are sent
});

export default axiosInstance;
