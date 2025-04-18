from config.database import db

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    type = db.Column(db.String(10), nullable=False)  # 'income' or 'expense'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type
        }
