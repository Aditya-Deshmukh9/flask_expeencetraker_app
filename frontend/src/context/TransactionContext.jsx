import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const TransactionContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // fallback if env is missing

export function useTransactions() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({
    income_total: 0,
    expense_total: 0,
    balance: 0,
    category_spending: [],
  });
  const [loading, setLoading] = useState(true);
  
  // Create headers with authentication token
  const authHeaders = {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  };

  // Fetch all transactions
  const fetchTransactions = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/transactions`, authHeaders);
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to load transactions");
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await axios.get(`${API_URL}/categories`, authHeaders);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  // Fetch summary data
  const fetchSummary = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await axios.get(`${API_URL}/summary`, authHeaders);
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
      toast.error("Failed to load summary data");
    }
  };

  // Add a new transaction
  const addTransaction = async (transactionData) => {
    try {
      const response = await axios.post(
        `${API_URL}/transactions`,
        transactionData,
        authHeaders
      );
      setTransactions([response.data, ...transactions]);
      fetchSummary(); // Update summary after adding transaction
      toast.success("Transaction added successfully");
      return response.data;
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error(error.response?.data?.error || "Failed to add transaction");
      throw error;
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`, authHeaders);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
      fetchSummary(); // Update summary after deleting transaction
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  // Add a new category
  const addCategory = async (categoryData) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, categoryData, authHeaders);
      setCategories([...categories, response.data]);
      toast.success("Category added successfully");
      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.error || "Failed to add category");
      throw error;
    }
  };

  // Load initial data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
      fetchCategories();
      fetchSummary();
    }
  }, [isAuthenticated, token]);

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
    addCategory,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
