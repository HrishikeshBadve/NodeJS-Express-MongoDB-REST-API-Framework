const Drink = require('../models/drink.model.js');

const getDrinks = async (req, res) => {
    try {
        const drinks = await Drink.find({});
        res.status(200).json(drinks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDrinkById = async (req, res) => {
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
};

const createDrink = async (req, res) => {
    try {
        const drink = await Drink.create(req.body);
        res.status(201).json(drink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDrink = async (req, res) => {
    try {
        const { id } = req.params;
        const drink = await Drink.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!drink) {
            return res.status(404).json({ message: "Drink not found" });
        }

        res.status(200).json(drink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDrink = async (req, res) => {
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
};

module.exports = {
    getDrinks,
    getDrinkById,
    createDrink,
    updateDrink,
    deleteDrink,
};
