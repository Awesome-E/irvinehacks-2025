import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename
from vision_recognition import extract_text_with_gpt
from dotenv import load_dotenv
load_dotenv()

# Initialize Flask app and enable CORS
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})  # Enable CORS with specific configuration

print("Initialized Flask app and CORS")

@app.route('/')
def index():
    print("Serving index page")
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    print("Processing file upload")
    
    if 'receipt' not in request.files:
        print("Error: No receipt file in request")
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['receipt']
    if file.filename == '':
        print("Error: Empty filename")
        return jsonify({'error': 'No file selected'}), 400

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(f"Saving file to: {filepath}")
        file.save(filepath)

        result = extract_text_with_gpt(filepath)
        
        if result:
            return jsonify({'items': result})
        else:
            return jsonify({'error': 'Failed to process image'}), 500

if __name__ == '__main__':
    if os.getenv('PYTHON_ENV', 'development') == 'production':
        from waitress import serve
        serve(app, host="0.0.0.0", port=5001)
    else:
        print("Starting Flask server")
        app.run(debug=True, port=5001)
