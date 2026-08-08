import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env") # reads the .env file and loads everything into the environment.

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

print("HOST:", DB_HOST)
print("PORT:", DB_PORT)
print("NAME:", DB_NAME)

DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}" # This is called a connection string. Everything else in SQLAlchemy uses this string.
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)