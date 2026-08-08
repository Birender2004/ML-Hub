from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.jwt_handler import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.models.prediction_history import PredictionHistory


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    predictions = (
        db.query(PredictionHistory)
        .filter(
            PredictionHistory.user_id == current_user.id
        )
        .order_by(
            PredictionHistory.created_at.desc()
        )
        .all()
    )

    total_predictions = len(predictions)

    spam_count = sum(
        1
        for prediction in predictions
        if prediction.model_name == "Spam Classifier"
    )

    movie_count = sum(
        1
        for prediction in predictions
        if prediction.model_name == "Movie Recommendation"
    )

    book_count = sum(
        1
        for prediction in predictions
        if prediction.model_name == "Book Recommendation"
    )

    fashion_count = sum(
        1
        for prediction in predictions
        if prediction.model_name == "Fashion Recommendation"
    )

    recent_predictions = [
        {
            "id": prediction.id,
            "model_name": prediction.model_name,
            "input_data": prediction.input_data,
            "output_data": prediction.output_data,
            "created_at": prediction.created_at,
        }
        for prediction in predictions[:5]
    ]

    return {
        "total_predictions": total_predictions,

        "model_counts": {
            "spam": spam_count,
            "movies": movie_count,
            "books": book_count,
            "fashion": fashion_count,
        },

        "recent_predictions": recent_predictions,
    }