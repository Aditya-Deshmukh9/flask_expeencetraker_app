# Personal Expense Tracker - Backend

This is the Flask backend for the Personal Expense Tracker application with JWT-based authentication and user-specific data management.

## Project Structure

```
backend/
├── app.py                # Main Flask application entry point
├── migrate_db.py         # Database migration script
├── requirements.txt      # Python dependencies
├── Procfile              # Deployment configuration for Render
├── .env                  # Environment variables (not in version control)
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── README.md             # This documentation file
│
├── config/               # Application configuration
│   ├── __init__.py       # Package initialization
│   └── database.py       # Database configuration and initialization
│
├── models/               # Database models
│   ├── __init__.py       # Package initialization
│   ├── category.py       # Category model
│   ├── transaction.py    # Transaction model with user relationship
│   └── user.py           # User model for authentication
│
├── routes/               # API routes
│   ├── __init__.py       # Route registration
│   ├── auth_routes.py    # Authentication routes (login, register, profile)
│   ├── category_routes.py # Category management routes
│   ├── transaction_routes.py # Transaction management routes
│   └── summary_routes.py # Financial summary routes
│
├── utils/                # Utility functions
│   └── __init__.py       # Package initialization
│
└── instance/             # Instance-specific files (not in version control)
    └── expense_tracker.db # SQLite database (development)
```

## Setup Instructions

1. Create a virtual environment (recommended):

   ```
   python -m venv venv
   ```

2. Activate the virtual environment:

   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python app.py
   ```

The server will start at http://localhost:5000.

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
# Flask application settings
FLASK_APP=app.py
FLASK_ENV=development  # Change to production for deployment
PORT=5000
DEBUG=True  # Set to False in production

# Database settings
DATABASE_URL=sqlite:///expense_tracker.db  # For production, use PostgreSQL

# CORS settings
FRONTEND_URL=http://localhost:3000  # URL of the frontend application

# JWT settings
JWT_SECRET=your-secret-key  # Change this to a secure random string
```

## Database Migration

If you need to migrate the database to add the user_id column to existing transactions:

```
python migrate_db.py
```

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user

  - Request body: `{ "username": "user", "email": "user@example.com", "password": "password" }`
  - Response: `{ "message": "User registered successfully", "token": "jwt-token", "user": {...} }`

- `POST /api/auth/login` - Login a user

  - Request body: `{ "login": "username or email", "password": "password" }`
  - Response: `{ "message": "Login successful", "token": "jwt-token", "user": {...} }`

- `GET /api/auth/me` - Get current user profile (requires authentication)
  - Headers: `{ "Authorization": "Bearer jwt-token" }`
  - Response: `{ "user": {...} }`

### Protected Endpoints (require authentication)

- `GET /api/categories` - Get all categories

  - Headers: `{ "Authorization": "Bearer jwt-token" }`

- `POST /api/categories` - Create a new category

  - Headers: `{ "Authorization": "Bearer jwt-token" }`
  - Request body: `{ "name": "Category Name", "type": "income|expense" }`

- `GET /api/transactions` - Get all transactions for the current user

  - Headers: `{ "Authorization": "Bearer jwt-token" }`

- `POST /api/transactions` - Create a new transaction for the current user

  - Headers: `{ "Authorization": "Bearer jwt-token" }`
  - Request body: `{ "amount": 100, "description": "Description", "type": "income|expense", "category_id": 1, "date": "2023-01-01T00:00:00" }`

- `DELETE /api/transactions/<id>` - Delete a transaction

  - Headers: `{ "Authorization": "Bearer jwt-token" }`

- `GET /api/summary` - Get summary statistics for the current user
  - Headers: `{ "Authorization": "Bearer jwt-token" }`
