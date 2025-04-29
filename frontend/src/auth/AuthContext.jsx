import { createContext, useContext, useEffect, useState } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await axios.get("/getProfile");
      setUser(res.data.user);
      if (res.data.user.role === "admin") navigate("/add-slice");
      else navigate("/spin");
    } catch {
      setUser(null);
    }
  };

  const login = async (data) => {
    await axios.post("login", data);
    await getProfile();
  };

  const logout = async () => {
    await axios.get("/logout");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
