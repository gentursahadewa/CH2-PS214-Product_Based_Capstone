from flask import Flask
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

app = Flask(__name__)

@app.route('/')

def get_size_predict()->object:
    # Load model Keras dari file H5
    model = load_model('fix_model_cnn.h5')

    # # Path ke gambar yang ingin diprediksi
    # image_path = 'image/onlineman2.png'

    # Load dan preprocess gambar
    img = image.load_img(image_path, target_size=(256, 192))
    img_array = image.img_to_array(img)
    img_array /= 255.0  # Normalisasi nilai pixel menjadi 0-1

    # # Show Image
    # plt.imshow(img_array)
    # # plt.axis('off')
    # plt.show()

    # Expand img dimensions to (1, 256, 192, 3) for set_tensor method call
    img_array = np.expand_dims(img_array, axis=0)

    # Lakukan prediksi
    # predictions = model.predict(img_array)
    predictions = np.argmax(model.predict(img_array), axis=1)
    class_labels = ['L', 'M', 'S', 'XL/Above']  # Assuming these are your class labels
    predicted_class = class_labels[predictions[0]]

    # Output prediksi
    return ("Size Predicted : "+ predicted_class)

if __name__ == '__main__':
    app.run(debug=True)