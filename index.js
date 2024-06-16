require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Drink = require('./models/drink.model.js');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
});

app.get('/api/drinks', async (req, res) => {
    try {
        const drinks = await Drink.find({});
        res.status(200).json(drinks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/drink/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const drink = await Drink.findById(id);

        if (!drink) {
            return res.status(404).json({ message: "Drink not found" });
        }

        res.status(200).json(drink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/drinks', async (req, res) => {
    try {
        const drink = await Drink.create(req.body);
        res.status(201).json(drink);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

app.put('/api/drink/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const drink = await Drink.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!drink) {
            return res.status(404).json({ message: "Drink not found" });
        }

        res.status(200).json(drink);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

app.delete('/api/drink/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const drink = await Drink.findByIdAndDelete(id);

        if (!drink) {
            return res.status(404).json({ message: "Drink not found" });
        }

        res.status(200).json({ message: "Drink deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to the database!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(() => {
        console.log("Connection failed!");
    });
