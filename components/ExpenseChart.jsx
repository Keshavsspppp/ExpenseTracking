"use client";
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function ExpenseChart({ expenses }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Group the expenses by category to get the totals
  const dataMap = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // 2. Format the data into an array that Recharts understands
  const chartData = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key]
  }));

  if (chartData.length === 0) return null;

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur-xl h-80 w-full min-w-0 flex items-center justify-center text-slate-400">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur-xl h-80 w-full min-w-0 flex flex-col">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Insights</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Spending by category</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
          Category split
        </div>
      </div>

      <div className="flex flex-1 min-h-0 items-center justify-center overflow-hidden">
        <PieChart width={340} height={210}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={82}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Spent']}
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.96)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              color: '#e2e8f0',
            }}
          />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: 12, color: '#cbd5e1' }} />
        </PieChart>
      </div>
    </div>
  );
}