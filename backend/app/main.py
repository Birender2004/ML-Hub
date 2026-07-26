from fastapi import FastAPI
from app.api.routes import router as main_router
from app.api.auth import router as auth_router
from app.database.init_db import init_db

app = FastAPI()

init_db()

app.include_router(main_router)
app.include_router(auth_router)