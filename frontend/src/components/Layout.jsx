import { useAuth } from '../auth/AuthContext'; // or wherever you defined it
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const { logout } = useAuth(); // adjust based on your auth logic
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears user token/context
    navigate('/'); // redirect to login
  };

  return (
    <div className="w-screen h-screen overflow-auto bg-gradient-to-r from-white via-blue-100 to-blue-300">
      <div className="flex justify-end items-center p-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <div className="px-4 pb-10">{children}</div>
    </div>
  );
}
