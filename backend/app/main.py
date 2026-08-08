from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as main_router
from app.api.auth import router as auth_router
from app.database.init_db import init_db
from app.api.user import router as user_router
from app.api.spam import router as spam_router
from app.api.movie import router as movie_router
from app.api.history import router as history_router
from app.api.book import router as book_router
from app.api.fashion import router as fashion_router
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.api.dashboard import router as dashboard_router

app = FastAPI(title="ML Hub API")

FASHION_IMAGES_DIR = (
    Path(__file__).resolve().parents[1]
    / "trained_models"
    / "fashion"
    / "images"
)

app.mount(
    "/fashion-images",
    StaticFiles(directory=FASHION_IMAGES_DIR),
    name="fashion-images",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(main_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(spam_router)
app.include_router(movie_router)
app.include_router(history_router)
app.include_router(book_router)
app.include_router(fashion_router)
app.include_router(dashboard_router)