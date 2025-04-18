from flask import Blueprint, request, jsonify
from models.transaction import Transaction
from models.category import Category
from config.database import db
from datetime import datetime
from routes.auth_routes import token_required

# Create a Blueprint for transaction routes
transaction_bp = Blueprint('transactions', __name__)

@transaction_bp.route('/transactions', methods=['GET'])
@token_required
def get_transactions(current_user):
    """Get all transactions for the current user"""
    transactions = Transaction.query.filter_by(user_id=current_user.id).order_by(Transaction.date.desc()).all()
    return jsonify([transaction.to_dict() for transaction in transactions])

@transaction_bp.route('/transactions', methods=['POST'])
@token_required
def add_transaction(current_user):
    """Add a new transaction for the current user"""
    data = request.json
    
    if not data or 'amount' not in data or 'type' not in data or 'category_id' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Validate category exists
    category = Category.query.get(data['category_id'])
    if not category:
        return jsonify({'error': 'Invalid category ID'}), 400
    
    # Validate type matches category type
    if data['type'] != category.type:
        return jsonify({'error': f'Transaction type must match category type ({category.type})'}), 400
    
    new_transaction = Transaction(
        amount=data['amount'],
        description=data.get('description', ''),
        type=data['type'],
        category_id=data['category_id'],
        date=datetime.fromisoformat(data['date']) if 'date' in data else datetime.utcnow(),
        user_id=current_user.id
    )
    
    db.session.add(new_transaction)
    db.session.commit()
    
    return jsonify(new_transaction.to_dict()), 201

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
@token_required
def delete_transaction(current_user, transaction_id):
    """Delete a transaction for the current user"""
    transaction = Transaction.query.get(transaction_id)
    
    if not transaction:
        return jsonify({'error': 'Transaction not found'}), 404
        
    # Ensure the transaction belongs to the current user
    if transaction.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized access to this transaction'}), 403
    
    db.session.delete(transaction)
    db.session.commit()
    
    return jsonify({'message': 'Transaction deleted successfully'}), 200
