from pydantic import BaseModel


class BookRequest(BaseModel):
    book: str


class BookRecommendation(BaseModel):
    title: str
    author: str
    image: str


class BookResponse(BaseModel):
    book: str
    recommendations: list[BookRecommendation]