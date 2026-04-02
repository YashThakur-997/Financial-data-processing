const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT || 3000;
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Finance API is running' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});