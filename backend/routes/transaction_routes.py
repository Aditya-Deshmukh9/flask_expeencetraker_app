from flask import Blueprint, request, jsonify
from models.transaction import Transaction
from models.category import Category
from config.database import db
from datetime import datetime

# Create a Blueprint for transaction routes
transaction_bp = Blueprint('transactions', __name__)

@transaction_bp.route('/transactions', methods=['GET'])
def get_transactions():
    """Get all transactions"""
    transactions = Transaction.query.order_by(Transaction.date.desc()).all()
    return jsonify([transaction.to_dict() for transaction in transactions])

@transaction_bp.route('/transactions', methods=['POST'])
def add_transaction():
    """Add a new transaction"""
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
        date=datetime.fromisoformat(data['date']) if 'date' in data else datetime.utcnow()
    )
    
    db.session.add(new_transaction)
    db.session.commit()
    
    return jsonify(new_transaction.to_dict()), 201

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    """Delete a transaction"""
    transaction = Transaction.query.get(transaction_id)
    
    if not transaction:
        return jsonify({'error': 'Transaction not found'}), 404
    
    db.session.delete(transaction)
    db.session.commit()
    
    return jsonify({'message': 'Transaction deleted successfully'}), 200
