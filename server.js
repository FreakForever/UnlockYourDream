const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('./models/User'); // Import the User model

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body; // Include username and email
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword }); // Use both username and email
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, email, password } = req.body; // Include username and email
    try {
        // You can choose to allow login by either username or email
        const user = await User.findOne({ $or: [{ username }, { email }] }); // Find user by username or email
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
});

// Define a route for similarity calculation
app.post('/calculate-similarity', async (req, res) => {
    const { resumeText, jobText } = req.body;

    try {
        // Call the Python Flask API
        const response = await axios.post('http://127.0.0.1:5000/parse-and-match', {
            resume_text: resumeText,
            job_text: jobText,
        });
        res.json({ similarity: response.data.similarity });
    } catch (error) {
        console.error('Error from Python service:', error.message);
        res.status(500).json({ error: 'Failed to calculate similarity' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Node.js API running on http://localhost:3000');
});
