"""
Database migration script to add user_id column to transaction table.
Run this script on your production database to update the schema.
"""
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create a minimal Flask app
app = Flask(__name__)

# Configure database
database_url = os.environ.get('DATABASE_URL', 'sqlite:///expense_tracker.db')
# Fix for PostgreSQL URLs from Heroku/Render
if database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

def migrate_database():
    """Add user_id column to transaction table if it doesn't exist"""
    with app.app_context():
        # Check if the column exists first to avoid errors
        engine = db.engine
        inspector = db.inspect(engine)
        columns = [column['name'] for column in inspector.get_columns('transaction')]
        
        if 'user_id' not in columns:
            print("Adding user_id column to transaction table...")
            # For SQLite
            if database_url.startswith('sqlite'):
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
        else:
            print("user_id column already exists in transaction table.")

if __name__ == '__main__':
    migrate_database()
