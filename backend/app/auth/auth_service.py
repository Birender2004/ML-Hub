from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user import User
from app.schemas.user import UserCreate
from app.auth.hashing import hash_password


def register_user(user: UserCreate, db: Session):
    # Check if email already exists
    existing_email = db.query(User).filter(User.email == user.email).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Check if username already exists
    existing_username = db.query(User).filter(User.username == user.username).first()

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )

    # Create user
    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

from fastapi import HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.models.user import User
from app.auth.hashing import verify_password
from app.auth.jwt_handler import create_access_token

def login_user(
    form_data: OAuth2PasswordRequestForm,
    db: Session
):
    db_user = (
        db.query(User)
        .filter(User.email == form_data.username)
        .first()
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

