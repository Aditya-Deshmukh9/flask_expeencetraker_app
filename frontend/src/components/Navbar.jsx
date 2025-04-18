import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChartPie, FaExchangeAlt, FaTags, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-bold">
            Personal Expense Tracker
          </Link>
          
          {isAuthenticated ? (
            <div className="flex space-x-1">
              <Link
                to="/"
                className={`flex items-center px-3 py-2 rounded hover:bg-blue-700 ${isActive('/')}`}
              >
                <FaChartPie className="mr-2" />
                Dashboard
              </Link>
              
              <Link
                to="/transactions"
                className={`flex items-center px-3 py-2 rounded hover:bg-blue-700 ${isActive('/transactions')}`}
              >
                <FaExchangeAlt className="mr-2" />
                Transactions
              </Link>
              
              <Link
                to="/categories"
                className={`flex items-center px-3 py-2 rounded hover:bg-blue-700 ${isActive('/categories')}`}
              >
                <FaTags className="mr-2" />
                Categories
              </Link>
              
              <div className="flex items-center px-3 py-2 rounded">
                <FaUser className="mr-2" />
                {user?.username}
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded hover:bg-blue-700"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-1">
              <Link
                to="/login"
                className={`flex items-center px-3 py-2 rounded hover:bg-blue-700 ${isActive('/login')}`}
              >
                Login
              </Link>
              
              <Link
                to="/register"
                className={`flex items-center px-3 py-2 rounded hover:bg-blue-700 ${isActive('/register')}`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
