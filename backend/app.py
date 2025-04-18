from flask import Flask
from flask_cors import CORS
from config.database import init_db
from routes import register_routes
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create and configure the Flask application
app = Flask(__name__)

@app.route('/')
def home():
    return 'Welcome to the Expense Tracker API'

# Configure CORS
frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
CORS(app, origins=[frontend_url])

# Initialize the database
init_db(app)

# Register API routes
register_routes(app)

if __name__ == '__main__':
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    app.run(host='0.0.0.0', port=port, debug=debug)
