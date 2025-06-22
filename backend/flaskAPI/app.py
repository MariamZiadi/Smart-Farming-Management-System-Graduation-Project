
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
        "labels": ["Early Blight", "Healthy", "Late Blight"]
    },
    "strawberry": {
        "model": load_model("Strawberry_best_model.keras"),
        "labels": ["Healthy", "Leaf Scorch"]
    },
    "apple": {
        "model": load_model("Apple_best_model.keras"),
        "labels": ["Apple Scab", "Black Rot", "Cedar Apple Rust", "Healthy"]
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
    if 'file' not in request.files or 'crop' not in request.form:
        return jsonify({"error": "Missing file or crop selection"}), 400

    image = request.files['file']
    crop_type = request.form['crop'].lower()

    print("Received crop:", crop_type)
    print("Received file:", image.filename)

    if crop_type not in model_map:
        return jsonify({"error": f"Crop '{crop_type}' not supported"}), 400

    image_path = os.path.join("uploads", image.filename)
    image.save(image_path)

    try:
        processed_image = prepare_image(image_path)
        model_info = model_map[crop_type]
        prediction = model_info["model"].predict(processed_image)
        predicted_class = model_info["labels"][np.argmax(prediction)]
        probability = float(np.max(prediction))

        return jsonify({
            "crop_type": crop_type,
            "prediction": predicted_class,
            "probability": probability
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        os.remove(image_path)


if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)
    app.run(host='0.0.0.0', port=5000)
