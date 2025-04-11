

from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import os

app = Flask(__name__)

# Load all models and their class labels
model_map = {
    "potato": {
        "model": load_model("Potato_best_model.keras"),
        "labels": ["Early Blight", "Late Blight", "Healthy"]
    },
    "strawberry": {
        "model": load_model("Strawberry_best_model.keras"),
        "labels": ["Leaf Scorch", "Healthy"]
    },
    "apple": {
        "model": load_model("Apple_best_model.keras"),
        "labels": ["Apple Scab", "Black Rot", "Healthy", "Cedar Apple Rust"]
    },
    "grape": {
        "model": load_model("Grape_best_model.keras"),
        "labels": ["Black Rot", "Esca (Black Measles)", "Healthy", "Leaf Blight"]
    },
    "peach": {
        "model": load_model("Peach_best_model.keras"),
        "labels": ["Bacterial Spot", "Healthy"]
    }
}

def prepare_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize((224, 224))  # Adjust based on your model input
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image = request.files['image']
    image_path = os.path.join("uploads", image.filename)
    image.save(image_path)

    try:
        highest_prob = 0
        best_crop = None
        best_disease = None

        # Try each model and check the prediction
        for crop_type, model_info in model_map.items():
            processed_image = prepare_image(image_path)
            prediction = model_info["model"].predict(processed_image)
            max_prob = np.max(prediction)  # Highest probability for the crop's prediction
            predicted_class = model_info["labels"][np.argmax(prediction)]

            if max_prob > highest_prob:
                highest_prob = max_prob
                best_crop = crop_type
                best_disease = predicted_class

        if not best_crop:
            return jsonify({"error": "Could not classify the image properly."}), 400

        return jsonify({"crop_type": best_crop, "prediction": best_disease, "probability": highest_prob})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        os.remove(image_path)

if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)
    app.run(host='0.0.0.0', port=5000)
