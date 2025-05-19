from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import fitz

app = Flask(__name__)

CORS(app, supports_credentials=True)
# Set the upload folder
app.config['UPLOAD_FOLDER'] = './uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max 16 MB

# Make sure the upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

SKILL_KEYWORDS = [
    "Python", "Java", "C++", "JavaScript", "HTML", "CSS", "React", "Node.js", 
    "Flask", "Django", "SQL", "MongoDB", "Machine Learning", "Data Analysis", 
    "Pandas", "NumPy", "Git", "Docker", "Kubernetes", "AWS"
]

def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_skills(text):
    found = []
    text_lower = text.lower()
    for skill in SKILL_KEYWORDS:
        if skill.lower() in text_lower:
            found.append(skill)
    return list(set(found))
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'resume' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['resume']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Ensure safe file name
    filename = secure_filename(file.filename)

    # Save the file
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # You can now process the file, e.g., extract text or skills
    # For now, just send back the filename for testing
    try:
        text = extract_text_from_pdf(file_path)
        skills = extract_skills(text)
        return jsonify({
            "message": "File uploaded and processed",
            "filename": filename,
            "skills": skills
        })
    except Exception as e:
        return jsonify({"error": f"Failed to extract skills: {str(e)}"}), 500
    return jsonify({"message": "File uploaded successfully", "filename": filename})
@app.route('/')
def home():
    return "Flask backend is running!"
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

