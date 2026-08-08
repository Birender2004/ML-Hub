import pickle
from pathlib import Path

from app.utils.text_preprocessing import transform


BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "trained_models" / "spam"

TFIDF_PATH = MODEL_DIR / "tfidf.pkl"

MODEL_PATH = MODEL_DIR / "mnb.pkl"


with open(TFIDF_PATH, "rb") as file:
    tfidf = pickle.load(file)

with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)


def predict_spam(message: str) -> str:

    transformed_message = transform(message)

    vector = tfidf.transform([transformed_message])

    prediction = model.predict(vector)[0]

    if prediction == 1:
        return "Spam"

    return "Not Spam"