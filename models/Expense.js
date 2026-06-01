// models/Expense.js
import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true }, // e.g., "Groceries"
  amount: { type: Number, required: true },      // e.g., 45.50
  category: { 
    type: String, 
    required: true,
    enum: ['Food', 'Rent', 'Entertainment', 'Utilities', 'Other'] 
  },
  date: { type: Date, default: Date.now }
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);