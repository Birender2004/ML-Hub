from sqlalchemy.orm import Session

from app.models.prediction_history import PredictionHistory


def save_prediction(
    db: Session,
    user_id: int,
    model_name: str,
    input_data: str,
    output_data: str,
):
    prediction = PredictionHistory(
        user_id=user_id,
        model_name=model_name,
        input_data=input_data,
        output_data=output_data,
    )

    db.add(prediction)

    db.commit()

    db.refresh(prediction)

    return prediction


def get_user_predictions(
    db: Session,
    user_id: int,
):
    return (
        db.query(PredictionHistory)
        .filter(PredictionHistory.user_id == user_id)
        .order_by(PredictionHistory.created_at.desc())
        .all()
    )