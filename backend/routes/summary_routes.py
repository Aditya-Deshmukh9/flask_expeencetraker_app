from flask import Blueprint, jsonify
from models.transaction import Transaction
from models.category import Category
from config.database import db
from routes.auth_routes import token_required

# Create a Blueprint for summary routes
summary_bp = Blueprint('summary', __name__)

@summary_bp.route('/summary', methods=['GET'])
@token_required
def get_summary(current_user):
    """Get financial summary data for the current user"""
    # Get total income for the current user
    income_total = db.session.query(db.func.sum(Transaction.amount))\
        .filter_by(type='income', user_id=current_user.id).scalar() or 0
    
    # Get total expense for the current user
    expense_total = db.session.query(db.func.sum(Transaction.amount))\
        .filter_by(type='expense', user_id=current_user.id).scalar() or 0
    
    # Get category-wise spending for the current user
    category_spending = db.session.query(
        Category.name,
        db.func.sum(Transaction.amount).label('total')
    ).join(Transaction)\
        .filter(Transaction.user_id == current_user.id)\
        .group_by(Category.id).all()
    
    category_data = [{'category': item[0], 'total': item[1]} for item in category_spending]
    
    return jsonify({
        'income_total': income_total,
        'expense_total': expense_total,
        'balance': income_total - expense_total,
        'category_spending': category_data
    })
