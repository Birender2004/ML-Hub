from pydantic import BaseModel


class SpamRequest(BaseModel):
    message: str


class SpamResponse(BaseModel):
    prediction: str