// src/auth/PrivateRoute.jsx
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" />;

  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
}
