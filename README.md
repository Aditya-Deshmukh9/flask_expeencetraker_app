# Personal Expense Tracker

A full-stack web application for tracking personal income and expenses, categorizing transactions, and viewing financial summaries with user authentication.

## Features

- User authentication (register, login, logout)
- Secure password hashing and JWT token-based authentication
- User-specific data isolation for privacy and security
- Track income and expenses
- Categorize transactions
- View summary reports (total income, total expenses, balance)
- Visualize spending with charts
- Manage categories

## Tech Stack

- **Frontend**: React with Vite, Tailwind CSS, Chart.js, React Router
- **Backend**: Flask, SQLAlchemy, JWT Authentication
- **Database**: SQLite (development), PostgreSQL (production)
- **Deployment**: Render (backend), Vercel (frontend)

## Project Structure

```
Personal-Expense-Tracker/
├── backend/                 # Flask backend
│   ├── app.py               # Main Flask application entry point
│   ├── migrate_db.py        # Database migration script
│   ├── requirements.txt     # Python dependencies
│   ├── Procfile             # Deployment configuration for Render
│   ├── .env                 # Environment variables (not in version control)
│   ├── .env.example         # Example environment variables
│   ├── config/              # Application configuration
│   │   ├── __init__.py      # Package initialization
│   │   └── database.py      # Database configuration and initialization
│   ├── models/              # Database models
│   │   ├── __init__.py      # Package initialization
│   │   ├── category.py      # Category model
│   │   ├── transaction.py   # Transaction model with user relationship
│   │   └── user.py          # User model for authentication
│   ├── routes/              # API routes
│   │   ├── __init__.py      # Route registration
│   │   ├── auth_routes.py   # Authentication routes (login, register, profile)
│   │   ├── category_routes.py # Category management routes
│   │   ├── transaction_routes.py # Transaction management routes
│   │   └── summary_routes.py # Financial summary routes
│   └── README.md            # Backend setup instructions
│
├── frontend/                # React frontend
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx   # Navigation bar with auth state
│   │   │   └── ProtectedRoute.jsx # Route protection component
│   │   ├── context/         # React context providers
│   │   │   ├── AuthContext.jsx # Authentication state management
│   │   │   └── TransactionContext.jsx # Transaction data management
│   │   ├── pages/           # Application pages
│   │   │   ├── Dashboard.jsx # Financial overview
│   │   │   ├── Transactions.jsx # Transaction management
│   │   │   ├── Categories.jsx # Category management
│   │   │   ├── Login.jsx    # User login page
│   │   │   └── Register.jsx # User registration page
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── public/              # Static assets
│   ├── .env                 # Environment variables (not in version control)
│   ├── .env.example         # Example environment variables
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── README.md            # Frontend setup instructions
│
└── README.md                # Project overview (this file)
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
   source venv/bin/activate  # macOS/Linux
   ```

3. Create a `.env` file with the following variables:

   ```
   # Flask application settings
   FLASK_APP=app.py
   FLASK_ENV=development
   PORT=5000
   DEBUG=True

   # Database settings
   DATABASE_URL=sqlite:///expense_tracker.db

   # CORS settings
   FRONTEND_URL=http://localhost:3000

   # JWT settings
   JWT_SECRET=your-secret-key-for-development
   ```

4. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

5. Run the Flask server:

   ```
   python app.py
   ```

The backend server will start at http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Create a `.env` file with the following variables:

   ```
   # API URL for backend connection
   VITE_API_URL=http://localhost:5000/api

   # Environment
   VITE_NODE_ENV=development
   ```

3. Install dependencies:

   ```
   pnpm install
   ```

4. Start the development server:

   ```
   pnpm dev
   ```

The frontend application will be available at http://localhost:3000.

## Usage

1. Start both the backend and frontend servers
2. Open http://localhost:3000 in your browser
3. Register a new account or login with existing credentials
4. Use the navigation menu to access different sections:
   - Dashboard: View financial overview and charts
   - Transactions: Add, view, and delete transactions
   - Categories: Add and view income/expense categories

## Deployment

The application is configured for deployment on:
- **Backend**: Render (with PostgreSQL database)
- **Frontend**: Vercel

Environment variables are used for configuration in both environments.
