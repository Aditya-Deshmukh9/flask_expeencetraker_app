# Personal Expense Tracker - Backend

This is the Flask backend for the Personal Expense Tracker application.

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

## API Endpoints

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `DELETE /api/transactions/<id>` - Delete a transaction
- `GET /api/summary` - Get summary statistics
