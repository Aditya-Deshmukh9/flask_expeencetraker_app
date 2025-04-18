import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TransactionContext = createContext();

export function useTransactions() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({
    income_total: 0,
    expense_total: 0,
    balance: 0,
    category_spending: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  // Fetch summary data
  const fetchSummary = async () => {
    try {
      const response = await axios.get('/api/summary');
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      toast.error('Failed to load summary data');
    }
  };

  // Add a new transaction
  const addTransaction = async (transactionData) => {
    try {
      const response = await axios.post('/api/transactions', transactionData);
      setTransactions([response.data, ...transactions]);
      fetchSummary(); // Update summary after adding transaction
      toast.success('Transaction added successfully');
      return response.data;
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error(error.response?.data?.error || 'Failed to add transaction');
      throw error;
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      setTransactions(transactions.filter(transaction => transaction.id !== id));
      fetchSummary(); // Update summary after deleting transaction
      toast.success('Transaction deleted successfully');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction');
    }
  };

  // Add a new category
  const addCategory = async (categoryData) => {
    try {
      const response = await axios.post('/api/categories', categoryData);
      setCategories([...categories, response.data]);
      toast.success('Category added successfully');
      return response.data;
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error(error.response?.data?.error || 'Failed to add category');
      throw error;
    }
  };

  // Load initial data
  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchSummary();
  }, []);

  const value = {
    transactions,
    categories,
    summary,
    loading,
    fetchTransactions,
    fetchCategories,
    fetchSummary,
    addTransaction,
    deleteTransaction,
    addCategory
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
