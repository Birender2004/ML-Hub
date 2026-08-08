import os
import requests

API_KEY = os.getenv("OMDB_API_KEY")


def fetch_poster(movie_title: str):

    url = (
        f"http://www.omdbapi.com/"
        f"?t={movie_title}"
        f"&apikey={API_KEY}"
    )

    response = requests.get(url)

    data = response.json()

    return data.get("Poster", "")