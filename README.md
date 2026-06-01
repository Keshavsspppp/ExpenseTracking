# Expense Tracker

A modern expense tracker built with Next.js, MongoDB, and Recharts. It lets you add expenses, view recent transactions, and see category-based spending in a clean dashboard.

## Features

- Add expenses with description, amount, category, and date
- Store and read data from MongoDB Atlas
- View recent transactions in a styled activity list
- Visualize spending by category with a pie chart
- Responsive dashboard layout for desktop and mobile

## Tech Stack

- Next.js 16
- React 19
- MongoDB and Mongoose
- Recharts
- Tailwind CSS 4

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create or update your environment file:

```bash
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=expense-tracker
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## MongoDB Compass

If you are using MongoDB Compass, create a database named `expense-tracker` and a collection named `expenses`.

The app writes documents with the following shape:

```json
{
	"description": "Groceries",
	"amount": 45.5,
	"category": "Food",
	"date": "2026-06-01T12:00:00.000Z"
}
```

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build the app for production
- `npm run start` - run the production build
- `npm run lint` - run ESLint

## Project Structure

- `app/` - Next.js app router pages, layout, API routes, and global styles
- `components/` - dashboard UI components
- `lib/` - shared database connection helpers
- `models/` - Mongoose schemas

## Notes

The app expects a valid MongoDB connection string in `.env.local`. If Compass shows system databases only, connect to your Atlas cluster and open the `expense-tracker` database, then refresh the `expenses` collection after adding a new item in the app.
# ExpenseTracking

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
