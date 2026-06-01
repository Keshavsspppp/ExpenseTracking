// app/api/expenses/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Expense from '../../../../models/Expense';

// DELETE: Remove a specific expense by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; // Next.js extracts the ID from the URL

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Expense deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}

// PUT: Update a specific expense by ID
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json(); // The new data sent from the frontend

    const updatedExpense = await Expense.findByIdAndUpdate(id, data, {
      new: true,           // Return the updated document instead of the old one
      runValidators: true, // Ensure the new data still matches your schema rules
    });

    if (!updatedExpense) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 });
  }
}   