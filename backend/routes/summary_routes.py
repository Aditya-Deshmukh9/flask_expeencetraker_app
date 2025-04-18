from flask import Blueprint, jsonify
from models.transaction import Transaction
from models.category import Category
from config.database import db

# Create a Blueprint for summary routes
summary_bp = Blueprint('summary', __name__)

@summary_bp.route('/summary', methods=['GET'])
def get_summary():
    """Get financial summary data"""
    # Get total income
    income_total = db.session.query(db.func.sum(Transaction.amount)).filter_by(type='income').scalar() or 0
    
    # Get total expense
    expense_total = db.session.query(db.func.sum(Transaction.amount)).filter_by(type='expense').scalar() or 0
    
    # Get category-wise spending
    category_spending = db.session.query(
        Category.name,
        db.func.sum(Transaction.amount).label('total')
    ).join(Transaction).group_by(Category.id).all()
    
    category_data = [{'category': item[0], 'total': item[1]} for item in category_spending]
    
    return jsonify({
        'income_total': income_total,
        'expense_total': expense_total,
        'balance': income_total - expense_total,
        'category_spending': category_data
    })
