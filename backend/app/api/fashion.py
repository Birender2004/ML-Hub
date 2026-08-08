from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    HTTPException,
)

from io import BytesIO
from pathlib import Path

from PIL import Image

from sqlalchemy.orm import Session

from app.auth.jwt_handler import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.models.prediction_history import PredictionHistory
from app.ml_services.fashion_service import recommend_fashion


router = APIRouter(
    prefix="/fashion",
    tags=["Fashion Recommendation"]
)


@router.post("/recommend")
async def recommend(
    image: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Generate fashion recommendations and save
    the prediction to the user's history.
    """

    # --------------------------------------------------
    # Validate image
    # --------------------------------------------------

    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image file."
        )

    # --------------------------------------------------
    # Read uploaded image
    # --------------------------------------------------

    try:
        contents = await image.read()

        uploaded_image = Image.open(
            BytesIO(contents)
        ).convert("RGB")

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read the uploaded image."
        )

    # --------------------------------------------------
    # Generate recommendations
    # --------------------------------------------------

    recommendations = recommend_fashion(
        uploaded_image
    )

    # --------------------------------------------------
    # Prepare output
    # --------------------------------------------------

    output_data = ", ".join(
        item["filename"]
        for item in recommendations
    )

    # --------------------------------------------------
    # Save prediction history
    # --------------------------------------------------

    history = PredictionHistory(
        user_id=current_user.id,
        model_name="Fashion Recommendation",
        input_data=image.filename or "uploaded_image",
        output_data=output_data,
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    # --------------------------------------------------
    # Return response
    # --------------------------------------------------

    return {
        "recommendations": [
            {
                "filename": item["filename"],
                "image_url": f"/fashion-images/{item['filename']}"
            }
            for item in recommendations
        ]
    }