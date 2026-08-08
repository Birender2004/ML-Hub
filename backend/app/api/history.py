from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.jwt_handler import get_current_user
from app.models.user import User

from app.schemas.prediction_history import PredictionHistoryResponse
from app.services.history_service import get_user_predictions

router = APIRouter(
    prefix="/history",
    tags=["Prediction History"]
)


@router.get(
    "/",
    response_model=list[PredictionHistoryResponse]
)
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_user_predictions(
        db=db,
        user_id=current_user.id,
    )