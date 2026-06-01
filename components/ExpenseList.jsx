"use client";

export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-center shadow-xl shadow-slate-950/30 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Recent activity</p>
        <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-10 text-slate-400">
          No expenses recorded yet. Add one above to populate the feed.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Recent activity</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Recent transactions</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
          {expenses.length} items
        </div>
      </div>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div key={expense._id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-cyan-400/30 hover:bg-white/7">
            <div className="min-w-0">
              <p className="truncate font-medium text-white">{expense.description}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                <span className="rounded-full border border-white/10 bg-slate-950/40 px-2.5 py-1 text-xs uppercase tracking-[0.16em] text-cyan-200">{expense.category}</span>
                <span>{new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-lg font-semibold text-white">
                ${expense.amount.toFixed(2)}
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Spent
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}