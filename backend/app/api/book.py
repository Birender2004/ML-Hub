from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.jwt_handler import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.book import (
    BookRequest,
    BookResponse,
)
from app.ml_services.book_service import recommend_books
from app.services.history_service import save_prediction

router = APIRouter(
    prefix="/book",
    tags=["Book Recommendation"],
)


@router.post(
    "/recommend",
    response_model=BookResponse,
)
def recommend(
    request: BookRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    recommendations = recommend_books(request.book)

    book_titles = ", ".join(
        book["title"] for book in recommendations
    )

    save_prediction(
        db=db,
        user_id=current_user.id,
        model_name="Book Recommendation",
        input_data=request.book,
        output_data=book_titles,
    )

    return BookResponse(
        book=request.book,
        recommendations=recommendations,
    )