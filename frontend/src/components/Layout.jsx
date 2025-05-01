import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const { logout } = useAuth?.() || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/');
    }
  };

  return (
    <>
      {logout && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg transition"
          >
            Logout
          </button>
        </div>
      )}
      {children}
    </>
  );
}
