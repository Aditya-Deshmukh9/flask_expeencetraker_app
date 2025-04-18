from flask import Blueprint, request, jsonify
from models.category import Category
from config.database import db

# Create a Blueprint for category routes
category_bp = Blueprint('categories', __name__)

@category_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all categories"""
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])

@category_bp.route('/categories', methods=['POST'])
def add_category():
    """Add a new category"""
    data = request.json
    
    if not data or 'name' not in data or 'type' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if category already exists
    existing = Category.query.filter_by(name=data['name']).first()
    if existing:
        return jsonify({'error': 'Category already exists'}), 400
    
    new_category = Category(name=data['name'], type=data['type'])
    db.session.add(new_category)
    db.session.commit()
    
    return jsonify(new_category.to_dict()), 201
