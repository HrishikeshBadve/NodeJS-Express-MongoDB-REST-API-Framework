const Drink = require('../models/drink.model.js');
const myCache = require('../cache.js');

// Get all drinks with caching
const getDrinks = async (req, res) => {
    const drinksKey = 'allDrinks';
    const cachedDrinks = myCache.get(drinksKey);

    if (cachedDrinks) {
        return res.status(200).json(cachedDrinks);
    } else {
        try {
            const drinks = await Drink.find({});
            myCache.set(drinksKey, drinks);
            res.status(200).json(drinks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Invalidate cache when a drink is created, updated, or deleted
const invalidateCache = () => {
    myCache.del('allDrinks');
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
        invalidateCache(); // Invalidate cache after creation
        res.status(201).json(drink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDrink = async (req, res) => {
    try {
        const { id } = req.params;
        const drink = await Drink.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        invalidateCache(); // Invalidate cache after update
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
        invalidateCache(); // Invalidate cache after deletion
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
