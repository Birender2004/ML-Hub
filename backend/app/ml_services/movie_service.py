from pathlib import Path
import pickle
import pandas as pd

from app.utils.movie_helper import fetch_poster

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "trained_models" / "movie"

with open(MODEL_DIR / "movies_dict.pkl", "rb") as file:
    movies = pickle.load(file)

with open(MODEL_DIR / "similarity.pkl", "rb") as file:
    similarity = pickle.load(file)

df = pd.DataFrame(movies)


def recommend_movies(movie: str):

 matches = df[df["title"] == movie]

 if matches.empty:
    raise ValueError(f"Movie '{movie}' not found.")

 movie_index = matches.index[0]

 distances = similarity[movie_index]

 movie_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:7]

 recommendations = []

 for i in movie_list:

        title = df.iloc[i[0]].title

        recommendations.append(
            {
                "title": title,
                "poster": fetch_poster(title)
            }
        )

 return recommendations