# Personal Expense Tracker - Frontend

This is the React frontend for the Personal Expense Tracker application with user authentication and protected routes.

## Setup Instructions

1. Create a `.env` file in the frontend directory with the following variables:

   ```
   # API URL for backend connection
   VITE_API_URL=http://localhost:5000/api

   # Environment
   VITE_NODE_ENV=development
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Start the development server:

   ```
   pnpm dev
   ```

The application will be available at http://localhost:3000.

## Features

- User authentication (register, login, logout)
- Protected routes for authenticated users
- User-specific data management
- Dashboard with financial overview and charts
- Transaction management (add, view, delete)
- Category management (add, view)
- Responsive design with Tailwind CSS

## Technologies Used

- React
- React Router for routing and protected routes
- JWT for authentication
- Context API for state management
- Chart.js for data visualization
- Tailwind CSS for styling
- Axios for API requests
- React Toastify for notifications

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```
# API URL for backend connection
VITE_API_URL=http://localhost:5000/api

# Environment
VITE_NODE_ENV=development
```

## Project Structure

```
frontend/
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx   # Navigation bar with auth state
│   │   └── ProtectedRoute.jsx # Route protection component
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx # Authentication state management
│   │   └── TransactionContext.jsx # Transaction data management
│   ├── pages/           # Application pages
│   │   ├── Dashboard.jsx # Financial overview
│   │   ├── Transactions.jsx # Transaction management
│   │   ├── Categories.jsx # Category management
│   │   ├── Login.jsx    # User login page
│   │   └── Register.jsx # User registration page
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── .env                 # Environment variables (not in version control)
├── .env.example         # Example environment variables
├── index.html           # HTML entry point
├── package.json         # Frontend dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration for Tailwind
```

## Authentication Flow

1. User registers or logs in through the respective pages
2. JWT token is stored in localStorage for persistent sessions
3. AuthContext provides authentication state throughout the app
4. ProtectedRoute component prevents access to private routes
5. API requests include authentication headers for protected endpoints

## Deployment

The frontend is configured for deployment on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Configure the following environment variables in Vercel:
   - `VITE_API_URL`: URL of your backend API (e.g., https://your-backend.onrender.com/api)
   - `VITE_NODE_ENV`: Set to `production`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm preview` - Preview the production build locally
