const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

// Routes
const authRoutes = require('./routes/auth.routes');

if (!process.env.DATABASE_URL) {
    throw new Error('Missing required env var: DATABASE_URL');
}

if (!process.env.JWT_SECRET) {
    throw new Error('Missing required env var: JWT_SECRET');
}

const port = process.env.PORT || 3000;
const app = express();



// Middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Use routes
app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Finance API is running' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});