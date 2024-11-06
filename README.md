# ATS Backend

[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-v3.6%2B-blue)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)](https://www.mongodb.com/atlas/database)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ATS Backend is a backend service for an Application Tracking System (ATS) that includes **user authentication** and **resume-to-job description matching** using text similarity calculations. It leverages a **Node.js server** with Express and MongoDB for user management, and a **Python Flask service** for resume processing and text similarity calculations.

## 📁 Project Structure

ats-backend/
├── server.js                      # Main Node.js server file
├── models/
│   └── User.js                    # Mongoose User model for user management
├── python/
│   └── resume_parser_api.py       # Python file for resume parsing and text similarity calculation
├── .env                            # Environment variables (add this locally)
├── package.json                   # Node.js config file with dependencies
└── requirements.txt               # Python dependencies for Render
