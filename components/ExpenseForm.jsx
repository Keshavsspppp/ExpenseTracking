"use client";
import { useState } from 'react';

export default function ExpenseForm({ onExpenseAdded }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newExpense = {
      description,
      amount: parseFloat(amount),
      category
    };

    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense)
    });

    if (response.ok) {
      // Clear the form
      setDescription('');
      setAmount('');
      setCategory('Food');
      // Tell the parent page to refresh the data
      onExpenseAdded(); 
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Quick entry</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Add new expense</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Capture spending in a few seconds and keep the dashboard current.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Description</label>
          <input 
            type="text" 
            required 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
            placeholder="e.g., Weekly Groceries"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Amount ($)</label>
          <input 
            type="number" 
            required 
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
          >
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:translate-y-[-1px] hover:shadow-cyan-500/30"
        >
          <span className="relative z-10">Add Expense</span>
          <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-0 transition group-hover:opacity-100" />
        </button>
      </form>
    </div>
  );
}