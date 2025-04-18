from flask import Flask
from flask_cors import CORS
from config.database import init_db, db
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

# Run database migrations if needed
with app.app_context():
    # Check if the user_id column exists in the transaction table
    engine = db.engine
    inspector = db.inspect(engine)
    columns = [column['name'] for column in inspector.get_columns('transaction')]
    
    if 'user_id' not in columns:
        print("Adding user_id column to transaction table...")
        # For SQLite
        if app.config['SQLALCHEMY_DATABASE_URI'].startswith('sqlite'):
            db.session.execute(db.text(
                "ALTER TABLE transaction ADD COLUMN user_id INTEGER"
            ))
        # For PostgreSQL
        else:
            db.session.execute(db.text(
                "ALTER TABLE transaction ADD COLUMN user_id INTEGER"
            ))
        
        db.session.commit()
        print("Migration completed successfully!")

# Register API routes
register_routes(app)

if __name__ == '__main__':
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    app.run(host='0.0.0.0', port=port, debug=debug)
