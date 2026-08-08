from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.spam import SpamRequest, SpamResponse

from app.ml_services.spam_service import predict_spam

from app.auth.jwt_handler import get_current_user
from app.models.user import User

from app.services.history_service import save_prediction


router = APIRouter(
    prefix="/spam",
    tags=["Spam Classifier"]
)


@router.post(
    "/predict",
    response_model=SpamResponse
)
def predict(
    request: SpamRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = predict_spam(request.message)

    save_prediction(
        db=db,
        user_id=current_user.id,
        model_name="Spam Classifier",
        input_data=request.message,
        output_data=result,
    )

    return SpamResponse(
        prediction=result
    )