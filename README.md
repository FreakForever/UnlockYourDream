# ATS Backend

[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-v3.6%2B-blue)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)](https://www.mongodb.com/atlas/database)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ATS Backend is a backend service for an Application Tracking System (ATS) that includes **user authentication** and **resume-to-job description matching** using text similarity calculations. It leverages a **Node.js server** with Express and MongoDB for user management, and a **Python Flask service** for resume processing and text similarity calculations.

---

## ✨ Features

- **User Authentication**: Signup and login endpoints with bcrypt for hashing and JWT for token-based authentication.
- **Resume Parsing**: Extracts sections like skills and experience from resumes.
- **Text Similarity Calculation**: Calculates similarity scores between parsed resume content and job descriptions using TF-IDF and cosine similarity.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (>= 14.x)
- **Python** (>= 3.6) with `pip` for managing Python packages
- **MongoDB**: Set up a MongoDB database (local or cloud) for user data
- **Render Account**: Sign up at [Render](https://render.com)

### 🛠 Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ats-backend.git
   cd ats-backend
Install dependencies for Node.js:
`npm install`

Configure environment variables:

Create a .env file in the project root with the following variables:
`MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret`

Start the Node.js server:
`node server.js`

🤝 Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.
