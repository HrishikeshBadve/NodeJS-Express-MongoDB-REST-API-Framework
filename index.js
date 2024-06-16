const express = require('express')
const mongoose = require('mongoose');
const Drink = require('./models/drink.model.js');
const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
});

app.get('/api/drinks', async (req, res) => {
    try{
        const drinks = await Drink.find({});
        res.status(200).json(drinks);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});

app.get('/api/drink/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const drinks = await Drink.findById(id);
        res.status(200).json(drinks);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/drinks', async (req, res) => {
    try{
        const drink = await Drink.create(req.body);
        res.status(200).json(drink);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Update a Drink
app.put('/api/drink/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const drink = await Drink.findByIdAndUpdate(id, req.body);

        if(!drink) {
            return (res.status(404).json({message: "Drink not found"}));
        }

        const updatedDrink = await Drink.findById(id);
        res.status(200).json(updatedDrink);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Delete a Drink
app.delete('/api/drink/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const drink = await Drink.findByIdAndDelete(id);

        if(!drink) {
            return(res.status(404).json({message: "Drink not found"}));
        }
        res.status(200).json({message: "Drink deleted successfully"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect("mongodb+srv://admin:AKnXAx8saUBDLWio@backenddb.slbjhbt.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failed!");
});