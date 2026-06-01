"use client";
import { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseChart from '../components/ExpenseChart';

type ExpenseRecord = {
  _id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const expensesList = expenses as ExpenseRecord[];

  // Function to fetch data from our API
  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      const data: ExpenseRecord[] = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the page first loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Calculate total spent
  const totalSpent = expensesList.reduce((total: number, item: ExpenseRecord) => total + item.amount, 0);
  const transactionCount = expensesList.length;
  const categorySummary = expensesList.reduce<Record<string, number>>((acc: Record<string, number>, item: ExpenseRecord) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const categoryEntries = Object.entries(categorySummary) as Array<[string, number]>;
  const topCategoryEntry = categoryEntries.sort((left: [string, number], right: [string, number]) => right[1] - left[1])[0] || null;

  const summaryCards = [
    {
      label: 'Total spent',
      value: `$${totalSpent.toFixed(2)}`,
      hint: 'Across all tracked expenses',
    },
    {
      label: 'Transactions',
      value: transactionCount.toString().padStart(2, '0'),
      hint: 'Entries currently in view',
    },
    {
      label: 'Top category',
      value: topCategoryEntry ? topCategoryEntry[0] : 'N/A',
      hint: topCategoryEntry ? `$${topCategoryEntry[1].toFixed(2)} spent` : 'Add an expense to see it',
    },
  ];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-300">Loading dashboard...</div>;
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.14),transparent_32%)]" />
          <div className="pointer-events-none absolute -right-16 top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                Expense dashboard
              </div>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Track money with less friction.</h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                  Record spending, scan category trends, and review activity in one focused workspace built for quick updates.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[30rem] lg:flex-1">
              {summaryCards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/7">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{card.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.35fr]">
          <div className="space-y-6">
            <ExpenseForm onExpenseAdded={fetchExpenses} />
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Category pulse</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categoryEntries.length === 0 ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-400">No categories yet</span>
                ) : (
                  categoryEntries.map(([category, amount]: [string, number]) => (
                    <span key={category} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                      {category} · ${amount.toFixed(2)}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ExpenseChart expenses={expenses} />
            <ExpenseList expenses={expenses} />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-400 backdrop-blur-xl sm:flex-row sm:items-center">
          <p>Connected to MongoDB Atlas and synced to the <span className="text-slate-200">expense-tracker</span> database.</p>
          <p>Refresh Compass after adding an expense to see the latest document.</p>
        </div>
      </div>
    </main>
  );
}