import { Link, useLocation } from 'react-router-dom';
import { FaChartPie, FaExchangeAlt, FaTags } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-bold">
            Personal Expense Tracker
          </Link>
          
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
