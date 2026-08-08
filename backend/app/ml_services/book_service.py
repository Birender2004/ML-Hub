import pickle
from pathlib import Path

import numpy as np
import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "trained_models" / "book"

popular_df = pickle.load(open(MODEL_DIR / "popular.pkl", "rb"))
pt = pickle.load(open(MODEL_DIR / "pt.pkl", "rb"))
books = pickle.load(open(MODEL_DIR / "final_ratings.pkl", "rb"))
similarity_scores = pickle.load(open(MODEL_DIR / "similarity_scores.pkl", "rb"))


def recommend_books(book_name: str):
    if book_name not in pt.index:
        return []

    index = np.where(pt.index == book_name)[0][0]

    similar_items = sorted(
        list(enumerate(similarity_scores[index])),
        key=lambda x: x[1],
        reverse=True,
    )[1:7]

    recommendations = []

    for item in similar_items:
        temp_df = books[books["Book-Title"] == pt.index[item[0]]]

        book = temp_df.drop_duplicates("Book-Title")

        recommendations.append(
            {
                "title": book["Book-Title"].values[0],
                "author": book["Book-Author"].values[0],
                "image": book["Image-URL-M"].values[0],
            }
        )

    return recommendations