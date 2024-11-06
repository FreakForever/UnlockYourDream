const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const natural = require('natural');

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
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
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

// Text preprocessing and similarity calculation functions
const tokenizer = new natural.WordTokenizer();
function textPreprocess(text) {
    return tokenizer.tokenize(text.toLowerCase()).filter(word => !natural.stopwords.includes(word)).join(' ');
}

function calculateSimilarity(resumeText, jobText) {
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(textPreprocess(resumeText));
    tfidf.addDocument(textPreprocess(jobText));

    // Calculate cosine similarity
    const resumeVector = tfidf.documents[0];
    const jobVector = tfidf.documents[1];
    return natural.JaroWinklerDistance(resumeVector, jobVector);
}

// Define a route for similarity calculation
app.post('/calculate-similarity', async (req, res) => {
    const { resumeText, jobText } = req.body;
    const similarity = calculateSimilarity(resumeText, jobText);
    res.json({ similarity });
});

// Start the server
app.listen(3000, () => {
    console.log('Node.js API running on http://localhost:3000');
});
