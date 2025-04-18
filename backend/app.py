from flask import Flask
from flask_cors import CORS
from config.database import init_db
from routes import register_routes

# Create and configure the Flask application
app = Flask(__name__)
CORS(app)

# Initialize the database
init_db(app)

# Register API routes
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
