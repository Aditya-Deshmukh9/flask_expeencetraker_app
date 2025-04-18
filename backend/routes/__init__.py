# Import route modules to make them available when importing the routes package
from .category_routes import category_bp
from .transaction_routes import transaction_bp
from .summary_routes import summary_bp
from .auth_routes import auth_bp

def register_routes(app):
    """Register all blueprint routes with the app"""
    app.register_blueprint(category_bp, url_prefix='/api')
    app.register_blueprint(transaction_bp, url_prefix='/api')
    app.register_blueprint(summary_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
