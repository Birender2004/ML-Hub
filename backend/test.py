from pathlib import Path

from PIL import Image

from app.ml_services.fashion_service import recommend_fashion


BASE_DIR = Path(__file__).resolve().parent

IMAGE_PATH = (
    BASE_DIR
    / "trained_models"
    / "fashion"
    / "images"
    / "1163.jpg"
)


print("Testing image:")
print(IMAGE_PATH)

if not IMAGE_PATH.exists():
    print("ERROR: Image does not exist.")
    raise SystemExit(1)


img = Image.open(IMAGE_PATH)

print("\nImage loaded successfully.")
print("Image size:", img.size)

print("\nGenerating recommendations...")

recommendations = recommend_fashion(img)

print("\nFashion Recommendations:")
print("-" * 40)

for recommendation in recommendations:
    print(recommendation["filename"])

print("-" * 40)
print("Total recommendations:", len(recommendations))