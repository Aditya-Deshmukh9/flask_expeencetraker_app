from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy instance
db = SQLAlchemy()

def init_db(app):
    """Initialize the database with the Flask app"""
    # Configure SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expense_tracker.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize the app with the extension
    db.init_app(app)
    
    # Import models to ensure they are registered with SQLAlchemy
    from models.category import Category
    from models.transaction import Transaction
    
    # Create database and tables
    with app.app_context():
        db.create_all()
        
        # Add default categories if they don't exist
        default_categories = [
            {'name': 'Salary', 'type': 'income'},
            {'name': 'Freelance', 'type': 'income'},
            {'name': 'Investments', 'type': 'income'},
            {'name': 'Food', 'type': 'expense'},
            {'name': 'Transportation', 'type': 'expense'},
            {'name': 'Housing', 'type': 'expense'},
            {'name': 'Entertainment', 'type': 'expense'},
            {'name': 'Utilities', 'type': 'expense'},
            {'name': 'Healthcare', 'type': 'expense'},
            {'name': 'Shopping', 'type': 'expense'}
        ]
        
        for cat in default_categories:
            existing = Category.query.filter_by(name=cat['name']).first()
            if not existing:
                db.session.add(Category(name=cat['name'], type=cat['type']))
        
        db.session.commit()
