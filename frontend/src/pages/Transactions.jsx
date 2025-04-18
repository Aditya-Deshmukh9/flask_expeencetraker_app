import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Transactions = () => {
  const { transactions, categories, addTransaction, deleteTransaction, loading } = useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    category_id: ''
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convert amount to number
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        category_id: parseInt(formData.category_id)
      };
      
      await addTransaction(transactionData);
      
      // Reset form
      setFormData({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        category_id: ''
      });
      
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
    }
  };

  // Filter categories based on transaction type
  const filteredCategories = categories.filter(
    category => category.type === formData.type
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus className="mr-2" />
          Add Transaction
        </button>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="type" className="form-label">Type</label>
                <select
                  id="type"
                  name="type"
                  className="form-input"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="form-input"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_id" className="form-label">Category</label>
                <select
                  id="category_id"
                  name="category_id"
                  className="form-input"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group md:col-span-2">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="form-input"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a description"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 mr-2"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Transactions List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        
        {loading ? (
          <div className="text-center py-4">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No transactions found. Add your first transaction to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-3">{formatDate(transaction.date)}</td>
                    <td className="px-4 py-3">{transaction.description || '-'}</td>
                    <td className="px-4 py-3">{transaction.category_name}</td>
                    <td className={`px-4 py-3 text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete transaction"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
