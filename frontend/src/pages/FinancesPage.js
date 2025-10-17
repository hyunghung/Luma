// pages/FinancesPage.jsx
import React, { useState } from 'react';
import { DollarSign, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  food: '#FF6B6B',
  transport: '#4ECDC4',
  entertainment: '#FFE66D',
  utilities: '#95E1D3',
  salary: '#38B6FF',
  other: '#C7CEEA'
};

const FinancesPage = ({ transactions, setTransactions }) => {
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'food'
  });
  const [savingsGoal, setSavingsGoal] = useState(1000);
  const [currentSavings, setCurrentSavings] = useState(0);

  // Add Transaction
  const addTransaction = () => {
    if (!newTransaction.description.trim() || !newTransaction.amount) return;
    const transaction = {
      id: Date.now().toString(),
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      type: newTransaction.type,
      date: new Date().toISOString().split('T')[0],
      category: newTransaction.category
    };
    setTransactions([...transactions, transaction]);
    setNewTransaction({ description: '', amount: '', type: 'expense', category: 'food' });
  };

  // Delete Transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  // Prepare pie chart data
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  const savingsProgress = (currentSavings / savingsGoal) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border-2 border-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
          <DollarSign className="w-8 h-8" />
          Financial Quest
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-900 bg-opacity-50 border-2 border-green-600 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Income</p>
            <p className="text-2xl font-bold text-green-400">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-red-900 bg-opacity-50 border-2 border-red-600 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Expenses</p>
            <p className="text-2xl font-bold text-red-400">${totalExpense.toFixed(2)}</p>
          </div>
          <div className={`${balance >= 0 ? 'bg-blue-900 border-blue-600' : 'bg-red-900 border-red-600'} bg-opacity-50 border-2 rounded-lg p-4`}>
            <p className="text-sm text-gray-400 mb-1">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Savings Goal */}
        <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold text-cyan-400 mb-3">💰 Savings Goal</h3>
          <div className="flex gap-4 mb-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Goal Amount</label>
              <input
                type="number"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Current Savings</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>${currentSavings.toFixed(2)} / ${savingsGoal.toFixed(2)}</span>
              <span className="text-cyan-400 font-bold">{Math.min(Math.floor(savingsProgress), 100)}%</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-6 border border-gray-700">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${Math.min(savingsProgress, 100)}%` }}
              >
                {savingsProgress > 10 && (
                  <span className="text-xs text-white font-bold">
                    {Math.min(Math.floor(savingsProgress), 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Expense Pie Chart */}
        {pieData.length > 0 && (
          <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-3">📊 Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Add Transaction Form */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 space-y-3 border-2 border-gray-700">
          <h3 className="font-semibold text-cyan-400">Add Transaction</h3>
          <input
            type="text"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
          <input
            type="number"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            placeholder="Amount"
            step="0.01"
            className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
          <div className="flex gap-2">
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              className="flex-1 px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              className="flex-1 px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            >
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="utilities">Utilities</option>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            onClick={addTransaction}
            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/50"
          >
            Add Transaction
          </button>
        </div>

        {/* Transaction List */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg mb-3 text-cyan-400">Recent Transactions</h3>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          ) : (
            transactions.slice().reverse().map(transaction => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  transaction.type === 'income' ? 'bg-green-900 bg-opacity-30 border-green-600' : 'bg-red-900 bg-opacity-30 border-red-600'
                }`}
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">{transaction.description}</p>
                  <p className="text-sm text-gray-400">{transaction.category} • {transaction.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancesPage;