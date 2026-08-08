from app.database.database import Base, engine

# Import all models
from app.models.user import User
from app.models.prediction_history import PredictionHistory


def init_db():
    Base.metadata.create_all(bind=engine)