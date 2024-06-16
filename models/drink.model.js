const mongoose = require('mongoose');

const DrinkSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter drink name"],
            trim: true
        },

        price: {
            type: Number,
            required: true,
            default: 0,
            min: [0, "Price cannot be negative"]
        },

        drinkType: {
            type: String,
            required: [true, "Please enter drink type"],
            trim: true
        },

        image: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true
    }
);

const Drink = mongoose.model("Drink", DrinkSchema);

module.exports = Drink;