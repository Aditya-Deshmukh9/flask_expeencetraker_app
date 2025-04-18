import { useTransactions } from '../context/TransactionContext';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const { summary, loading } = useTransactions();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Prepare data for pie chart
  const pieData = {
    labels: summary.category_spending.map(item => item.category),
    datasets: [
      {
        data: summary.category_spending.map(item => item.total),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#8AC926', '#1982C4', '#6A4C93', '#F15BB5'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for bar chart
  const barData = {
    labels: summary.category_spending.map(item => item.category),
    datasets: [
      {
        label: 'Spending by Category',
        data: summary.category_spending.map(item => item.total),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Spending by Category',
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Financial Overview</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-green-50 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 text-white mr-4">
              <FaArrowUp size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase">Total Income</h3>
              <p className="text-2xl font-bold text-gray-700">{formatCurrency(summary.income_total)}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-red-50 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-500 text-white mr-4">
              <FaArrowDown size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase">Total Expenses</h3>
              <p className="text-2xl font-bold text-gray-700">{formatCurrency(summary.expense_total)}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-blue-50 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
              <FaWallet size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-500 uppercase">Current Balance</h3>
              <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(summary.balance)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Spending Distribution</h2>
          {summary.category_spending.length > 0 ? (
            <div className="h-64">
              <Pie data={pieData} />
            </div>
          ) : (
            <p className="text-gray-500">No spending data available</p>
          )}
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
          {summary.category_spending.length > 0 ? (
            <div className="h-64">
              <Bar data={barData} options={barOptions} />
            </div>
          ) : (
            <p className="text-gray-500">No category data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
