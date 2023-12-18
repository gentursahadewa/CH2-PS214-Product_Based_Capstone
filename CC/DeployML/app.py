from flask import Flask, request, jsonify, after_this_request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from dotenv import load_dotenv
import numpy as np
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG')
# Load Keras model from H5 file
model = load_model('fix_model.h5')

# Set the upload folder configuration
app.config['UPLOAD_FOLDER'] = 'uploads'

# Function to check if the file is an allowed type
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

# Ensure that the 'uploads' directory exists
uploads_dir = os.path.join(os.getcwd(), 'uploads')
os.makedirs(uploads_dir, exist_ok=True)

@app.route('/')
def check_server():
    return jsonify({'status': 'Berhasil Terhubung'})

@app.route('/predict_size', methods=['POST'])
def predict_size():
    try:
        # Check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        # If the user does not select a file, the browser submits an empty file without a filename
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        # Check if the file type is allowed
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'})

        # Save the file to a temporary location
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Load and preprocess the image
        img = image.load_img(file_path, target_size=(256, 192))
        img_array = image.img_to_array(img)
        img_array /= 255.0  # Normalization

        # Expand img dimensions to (1, 256, 192, 3) for set_tensor method call
        img_array = np.expand_dims(img_array, axis=0)

        # Perform prediction
        predictions = np.argmax(model.predict(img_array), axis=1)
        class_labels = ['L', 'M', 'S', 'XL/Above']  # Assuming these are your class labels
        predicted_class = class_labels[predictions[0]]

        @after_this_request
        def remove_file(response):
            # Remove the temporary file after the response is sent
            os.remove(file_path)
            return response

        # Output prediction
        response = {'Size Predicted': predicted_class}
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})

# Error handler for internal server errors
@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({'error': 'Internal Server Error'}), 500

# Run the app with the specified host and port
if __name__ == '__main__':
    app.run()
