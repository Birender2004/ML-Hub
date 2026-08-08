
from pydantic import BaseModel
from datetime import datetime


class PredictionHistoryResponse(BaseModel):

    id: int

    model_name: str

    input_data: str

    output_data: str

    created_at: datetime

    class Config:
        from_attributes = True