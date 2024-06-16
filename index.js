require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const drinkRoutes = require('./routes/drinkRoutes.js');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
});

app.use('/api/drinks', drinkRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to the database!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Connection failed!", error);
    });
