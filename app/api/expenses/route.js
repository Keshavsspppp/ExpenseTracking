// app/api/expenses/route.js
import { NextResponse } from 'next/server';
import Expense from '../../../models/Expense';
import connectDB from '../../../lib/mongodb';

// GET: Fetch all expenses
export async function GET() {
  try {
    await connectDB();
    const expenses = await Expense.find({}).sort({ date: -1 }); // Newest first
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Failed to load expenses from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to load expenses from MongoDB' }, { status: 500 });
  }
}

// POST: Create a new expense
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const newExpense = await Expense.create(data);
    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error('Failed to save expense to MongoDB:', error);
    return NextResponse.json({ error: 'Failed to save expense to MongoDB' }, { status: 500 });
  }
}