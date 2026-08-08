from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.auth.auth_service import register_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return register_user(user, db)


from app.schemas.auth import Token
from app.auth.auth_service import login_user
from fastapi.security import OAuth2PasswordRequestForm

@router.post(
    "/login",
    response_model=Token
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    return login_user(form_data, db)