# ATS Backend

[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-v3.6%2B-blue)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)](https://www.mongodb.com/atlas/database)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ATS Backend is a backend service for an Application Tracking System (ATS) that includes **user authentication** and **resume-to-job description matching** using text similarity calculations. It leverages a **Node.js server** with Express and MongoDB for user management, and a **Python Flask service** for resume processing and text similarity calculations.
✨ Features
User Authentication: Signup and login endpoints with bcrypt for hashing and JWT for token-based authentication.
Resume Parsing: Extracts sections like skills and experience from resumes.
Text Similarity Calculation: Calculates similarity scores between parsed resume content and job descriptions using TF-IDF and cosine similarity.
🚀 Getting Started
Prerequisites
Node.js (>= 14.x)
Python (>= 3.6) with pip for managing Python packages
MongoDB: Set up a MongoDB database (local or cloud) for user data
Render Account: Sign up at Render
🛠 Setup
Clone the repository:


git clone https://github.com/yourusername/ats-backend.git
cd ats-backend
Install dependencies for Node.js:

npm install
Set up the Python environment:

Navigate to the python folder.

Install dependencies with pip:

pip install -r requirements.txt
Configure environment variables:

Create a .env file in the project root with the following variables:

plaintext
Copy code
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
🏃 Running Locally
Start the Python Flask service (resume parser API):


python python/resume_parser_api.py
Start the Node.js server:


node server.js
Test the API: The Node.js API will run on http://localhost:3000 by default, and the Python API on http://localhost:5000.

🌐 API Endpoints
User Signup: POST /signup
Request Body: { "username": "example", "email": "example@example.com", "password": "password123" }
User Login: POST /login
Request Body: { "username": "example", "password": "password123" }
Similarity Calculation: POST /calculate-similarity
Request Body: { "resumeText": "resume content here", "jobText": "job description here" }
📦 Deploying on Render
Prepare the Repository:

Make sure both server.js (Node) and resume_parser_api.py (Python) are set up and include necessary packages.

Add Render Services:

Backend (Node.js) Deployment:

Go to the Render dashboard and click New Web Service.
Connect your GitHub repo with the Node.js project.
Set the Environment to Node and add any required environment variables (MONGODB_URI, JWT_SECRET).
Set the Build Command to npm install and the Start Command to node server.js.
Python (Flask) Deployment:

Create another Web Service in Render.
Set the environment to Python.
For the Start Command, enter python python/resume_parser_api.py.
Ensure requirements.txt is in the Python service directory for Render to install dependencies.
Set Environment Variables:

In each service, set the following environment variables:

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Configure Networking:

Ensure both the Node.js and Python services are network-accessible by setting the correct internal URL in your Node.js service to communicate with the Flask API.

Deploy: Once you configure each service, Render will automatically deploy them. You can access the logs to confirm the services start successfully.

🧰 Dependencies
Node.js & Express: Backend server and API routing
Mongoose: MongoDB object modeling
bcryptjs: Password hashing
jsonwebtoken: JWT authentication
axios: HTTP client for calling the Python service
Python & Flask: Backend resume parser
scikit-learn, spacy: NLP and text similarity libraries for Python
🤝 Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.
