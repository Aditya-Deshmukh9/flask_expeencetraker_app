# Personal Expense Tracker

A full-stack web application for tracking personal income and expenses, categorizing transactions, and viewing financial summaries.

## Features

- Track income and expenses
- Categorize transactions
- View summary reports (total income, total expenses, balance)
- Visualize spending with charts
- Manage categories

## Tech Stack

- **Frontend**: React with Vite, Tailwind CSS, Chart.js
- **Backend**: Flask, SQLAlchemy
- **Database**: SQLite

## Project Structure

```
Personal-Expense-Tracker/
├── backend/             # Flask backend
│   ├── app.py           # Main Flask application
│   ├── requirements.txt # Python dependencies
│   └── README.md        # Backend setup instructions
│
├── frontend/            # React frontend
│   ├── src/             # Source code
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Application pages
│   │   ├── context/     # React context providers
│   │   └── services/    # API services
│   ├── public/          # Static assets
│   ├── package.json     # Frontend dependencies
│   └── README.md        # Frontend setup instructions
│
└── README.md            # Project overview (this file)
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate  # Windows
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```
   python app.py
   ```

The backend server will start at http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Start the development server:
   ```
   pnpm dev
   ```

The frontend application will be available at http://localhost:3000.

## Usage

1. Start both the backend and frontend servers
2. Open http://localhost:3000 in your browser
3. Use the navigation menu to access different sections:
   - Dashboard: View financial overview and charts
   - Transactions: Add, view, and delete transactions
   - Categories: Add and view income/expense categories
