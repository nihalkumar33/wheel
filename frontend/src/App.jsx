import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SpinPage from './pages/SpinPage';
import AddSlicePage from './pages/AddSlicePage';
import SliceListPage from './pages/SliceListPage';
import PrivateRoute from './auth/PrivateRoute';
import Layout from "./components/Layout"; 
export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes with Layout */}
      <Route
        path="/spin"
        element={
          <PrivateRoute allowedRoles={['user']}>
            <Layout>
              <SpinPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/add-slice"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout>
              <AddSlicePage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/slice-list"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout>
              <SliceListPage />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
