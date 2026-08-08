from pydantic import BaseModel

class MovieRequest(BaseModel):
    movie: str


class RecommendedMovie(BaseModel):
    title: str
    poster: str


class MovieResponse(BaseModel):
    movie: str
    recommendations: list[RecommendedMovie]