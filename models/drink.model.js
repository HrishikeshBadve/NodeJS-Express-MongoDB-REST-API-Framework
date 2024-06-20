const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Drink:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - drinkType
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the drink
 *         price:
 *           type: number
 *           description: The price of the drink
 *         drinkType:
 *           type: string
 *           description: The type of the drink
 *         image:
 *           type: string
 *           description: URL to the image of the drink
 *       example:
 *         name: Lemonade
 *         price: 1.99
 *         drinkType: Soft Drink
 *         image: 'http://example.com/lemonade.jpg'
 */

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
            required: false,
            validate: {
                validator: function(v) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v);
                },
                message: props => `${props.value} is not a valid image URL!`
            }
        },
    },
    {
        timestamps: true
    }
);

const Drink = mongoose.model("Drink", DrinkSchema);

module.exports = Drink;