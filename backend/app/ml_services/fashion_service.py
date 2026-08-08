import pickle
from pathlib import Path

import numpy as np
from PIL import Image
from sklearn.neighbors import NearestNeighbors
from tensorflow.keras.applications.resnet50 import (
    ResNet50,
    preprocess_input,
)
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D


# ---------------------------------------------------------
# Paths
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "trained_models" / "fashion"

FEATURES_PATH = MODEL_DIR / "feature_list.pkl"
FILENAMES_PATH = MODEL_DIR / "filenames.pkl"


# ---------------------------------------------------------
# Load precomputed fashion features
# ---------------------------------------------------------

with open(FEATURES_PATH, "rb") as file:
    feature_list = pickle.load(file)

with open(FILENAMES_PATH, "rb") as file:
    filenames = pickle.load(file)


feature_list = np.array(feature_list)


# ---------------------------------------------------------
# Load ResNet50 feature extractor
# ---------------------------------------------------------

base_model = ResNet50(
    weights="imagenet",
    include_top=False,
    input_shape=(224, 224, 3),
)

base_model.trainable = False

model = base_model


# ---------------------------------------------------------
# Add pooling layer
# ---------------------------------------------------------

global_max_pooling = GlobalMaxPooling2D()


# ---------------------------------------------------------
# Nearest Neighbors
# ---------------------------------------------------------

neighbors = NearestNeighbors(
    n_neighbors=5,
    algorithm="brute",
    metric="euclidean",
)

neighbors.fit(feature_list)


# ---------------------------------------------------------
# Extract features from uploaded image
# ---------------------------------------------------------

def extract_features(img: Image.Image):

    img = img.convert("RGB")
    img = img.resize((224, 224))

    img_array = image.img_to_array(img)

    expanded_img = np.expand_dims(img_array, axis=0)

    preprocessed_img = preprocess_input(expanded_img)

    features = model.predict(
        preprocessed_img,
        verbose=0,
    )

    features = global_max_pooling(features)

    features = features.numpy()

    # L2 normalization
    features = features / (
        np.linalg.norm(features, axis=1, keepdims=True)
        + 1e-10
    )

    return features


# ---------------------------------------------------------
# Generate recommendations
# ---------------------------------------------------------

def recommend_fashion(uploaded_image: Image.Image):

    query_features = extract_features(uploaded_image)

    distances, indices = neighbors.kneighbors(
        query_features,
        n_neighbors=5,
    )

    recommendations = []

    for index in indices[0]:

        original_path = Path(filenames[index])

        filename = original_path.name

        recommendations.append(
            {
                "filename": filename,
            }
        )

    return recommendations