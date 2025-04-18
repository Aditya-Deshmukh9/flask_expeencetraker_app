import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { FaPlus, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

const Categories = () => {
  const { categories, addCategory, loading } = useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addCategory(formData);
      
      // Reset form
      setFormData({
        name: '',
        type: 'expense'
      });
      
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  // Separate categories by type
  const incomeCategories = categories.filter(category => category.type === 'income');
  const expenseCategories = categories.filter(category => category.type === 'expense');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Category Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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
                Save Category
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      {loading ? (
        <div className="text-center py-4">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income Categories */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                <FaMoneyBillWave size={20} />
              </div>
              <h2 className="text-xl font-semibold">Income Categories</h2>
            </div>
            
            {incomeCategories.length === 0 ? (
              <p className="text-gray-500">No income categories found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {incomeCategories.map(category => (
                  <li key={category.id} className="py-3 flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Expense Categories */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
                <FaCreditCard size={20} />
              </div>
              <h2 className="text-xl font-semibold">Expense Categories</h2>
            </div>
            
            {expenseCategories.length === 0 ? (
              <p className="text-gray-500">No expense categories found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {expenseCategories.map(category => (
                  <li key={category.id} className="py-3 flex items-center">
                    <span className="text-red-600 mr-2">•</span>
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
