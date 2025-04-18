from flask import Blueprint, request, jsonify
from config.database import db
from models.user import User
import jwt
import os
from datetime import datetime, timedelta
from functools import wraps

auth_bp = Blueprint('auth', __name__)

# Get JWT secret key from environment variables or use a default for development
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-for-development')
JWT_EXPIRATION_HOURS = 24  # Token expiration time in hours

def token_required(f):
    """Decorator to protect routes that require authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Get token from Authorization header
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            # Decode the token
            data = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            
            if not current_user:
                return jsonify({'message': 'Invalid token'}), 401
                
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
            
        # Pass the current user to the route function
        return f(current_user, *args, **kwargs)
    
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'{field} is required'}), 400
    
    # Check if username or email already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 409
        
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 409
    
    # Create new user
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )
    
    # Add user to database
    db.session.add(new_user)
    db.session.commit()
    
    # Generate JWT token
    token = jwt.encode({
        'user_id': new_user.id,
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }, JWT_SECRET, algorithm='HS256')
    
    return jsonify({
        'message': 'User registered successfully',
        'token': token,
        'user': new_user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login a user"""
    data = request.get_json()
    
    # Validate required fields
    if 'login' not in data or 'password' not in data:
        return jsonify({'message': 'Login and password are required'}), 400
    
    # Check if user exists (by username or email)
    user = User.query.filter_by(username=data['login']).first()
    if not user:
        user = User.query.filter_by(email=data['login']).first()
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    # Check password
    if not user.check_password(data['password']):
        return jsonify({'message': 'Invalid password'}), 401
    
    # Generate JWT token
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }, JWT_SECRET, algorithm='HS256')
    
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': user.to_dict()
    }), 200

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_user_profile(current_user):
    """Get current user profile"""
    return jsonify({
        'user': current_user.to_dict()
    }), 200
