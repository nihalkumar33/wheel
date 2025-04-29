import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SpinPage from './pages/SpinPage';
import AddSlicePage from './pages/AddSlicePage';
import SliceListPage from './pages/SliceListPage';
import PrivateRoute from './auth/PrivateRoute';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/spin"
        element={
          <PrivateRoute allowedRoles={['user']}>
            <SpinPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-slice"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AddSlicePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/slice-list"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <SliceListPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
