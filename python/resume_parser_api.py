from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import spacy

app = Flask(__name__)

# Load spacy model globally to avoid re-loading in every call
nlp = spacy.load('en_core_web_sm')

def extract_name(text):
    pattern = r"(\b[A-Z][a-z]+\b)\s(\b[A-Z][a-z]+\b)"
    match = re.search(pattern, text)
    return match.group() if match else None

def text_preprocess(text):
    doc = nlp(text)
    return " ".join([token.lemma_ for token in doc if not token.is_stop and not token.is_punct])

def extract_sections(text):
    sections = {
        'skills': re.search(r'Skills:?(.*?)(Experience|Education|$)', text, re.S),
        'experience': re.search(r'Experience:?(.*?)(Skills|Education|$)', text, re.S),
        'education': re.search(r'Education:?(.*?)(Experience|Skills|$)', text, re.S)
    }
    return {key: match.group(1).strip() if match else '' for key, match in sections.items()}

def calculate_similarity(resume_text, job_text):
    resume_text = text_preprocess(resume_text)
    job_text = text_preprocess(job_text)
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, job_text])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2]).flatten()[0]
    return similarity

@app.route('/parse-and-match', methods=['POST'])
def parse_and_match():
    data = request.get_json()
    resume_text = data['resume_text']
    job_text = data['job_text']

    sections = extract_sections(resume_text)
    skills_experience = sections['skills'] + ' ' + sections['experience']

    similarity_score = calculate_similarity(skills_experience, job_text)
    return jsonify({"similarity": similarity_score})

if __name__ == '__main__':
    app.run(port=5000)

# later stages need to improve my preprocessing function