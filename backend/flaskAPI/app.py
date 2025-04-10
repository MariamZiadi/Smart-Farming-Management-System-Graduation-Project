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
    crop_type = request.form.get('crop')
    if not crop_type or crop_type.lower() not in model_map:
        return jsonify({"error": "Invalid or missing crop type. Use one of: potato, strawberry, apple, grape, peach."}), 400

    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image = request.files['image']
    image_path = os.path.join("uploads", image.filename)
    image.save(image_path)

    try:
        processed_image = prepare_image(image_path)
        model_info = model_map[crop_type.lower()]
        prediction = model_info["model"].predict(processed_image)
        predicted_class = model_info["labels"][np.argmax(prediction)]

        return jsonify({"prediction": predicted_class})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        os.remove(image_path)

if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)
    app.run(host='0.0.0.0', port=5000)
