const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const prisma = require('./lib/prisma');

const port = process.env.PORT || 3000;
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Finance API is running' });
});

app.get('/user/get', async (req, res) => {
    try {
        const data = await prisma.User.findMany();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/user/post', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await prisma.User.create({
            data: { name, email },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});