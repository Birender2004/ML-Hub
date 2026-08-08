from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.movie import MovieRequest, MovieResponse

from app.ml_services.movie_service import recommend_movies

from app.auth.jwt_handler import get_current_user
from app.models.user import User

from app.services.history_service import save_prediction

router = APIRouter(
    prefix="/movie",
    tags=["Movie Recommendation"]
)


@router.post(
    "/recommend",
    response_model=MovieResponse
)
def recommend(
    request: MovieRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Get movie recommendations
    recommendations = recommend_movies(request.movie)

    # Extract only movie titles for prediction history
    movie_titles = ", ".join(
        movie["title"] for movie in recommendations
    )

    # Save prediction history
    save_prediction(
        db=db,
        user_id=current_user.id,
        model_name="Movie Recommendation",
        input_data=request.movie,
        output_data=movie_titles,
    )

    # Return complete response to frontend
    return MovieResponse(
        movie=request.movie,
        recommendations=recommendations,
    )