const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
dotenv.config();

// Routes
const authRoutes = require('./routes/auth.routes');
const financeRoutes = require('./routes/finance.routes');

// Check for required environment variables
if (!process.env.DATABASE_URL) {
    throw new Error('Missing required env var: DATABASE_URL');
}

// JWT_SECRET is now required for token operations
if (!process.env.JWT_SECRET) {
    throw new Error('Missing required env var: JWT_SECRET');
}

const port = process.env.PORT || 3000;
const app = express();



// Middlewares
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Use routes
app.use('/auth', authRoutes);
app.use('/finance', financeRoutes);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Finance API is running' });
});

// Centralized error handler (should be last)
const errorHandler = require('./utils/error.handler');
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});