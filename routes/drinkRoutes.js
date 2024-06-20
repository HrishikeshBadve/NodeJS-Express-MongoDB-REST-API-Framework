const express = require('express');
const {
    getDrinks,
    getDrinkById,
    createDrink,
    updateDrink,
    deleteDrink,
} = require('../controllers/drinkController.js');

const router = express.Router();

/**
 * @swagger
 * /drinks:
 *   get:
 *     summary: Returns a list of all drinks
 *     responses:
 *       200:
 *         description: A list of drinks.
 *         content:
 *           json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Drink'
 */
router.get('/', getDrinks);

/**
 * @swagger
 * /drinks/{id}:
 *   get:
 *     summary: Get a drink by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the drink to retrieve
 *     responses:
 *       200:
 *         description: Drink object found.
 *         content:
 *           json:
 *             schema:
 *               $ref: '#/components/schemas/Drink'
 *       404:
 *         description: Drink not found.
 */
router.get('/:id', getDrinkById);

/**
 * @swagger
 * /drinks:
 *   post:
 *     summary: Create a new drink
 *     requestBody:
 *       required: true
 *       content:
 *         json:
 *           schema:
 *             $ref: '#/components/schemas/Drink'
 *     responses:
 *       201:
 *         description: Drink created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/', createDrink);

/**
 * @swagger
 * /drinks/{id}:
 *   put:
 *     summary: Update a drink by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the drink to update
 *     requestBody:
 *       required: true
 *       content:
 *         json:
 *           schema:
 *             $ref: '#/components/schemas/Drink'
 *     responses:
 *       200:
 *         description: Drink updated successfully.
 *       404:
 *         description: Drink not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', updateDrink);

/**
 * @swagger
 * /drinks/{id}:
 *   delete:
 *     summary: Delete a drink by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the drink to delete
 *     responses:
 *       200:
 *         description: Drink deleted successfully.
 *       404:
 *         description: Drink not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', deleteDrink);

module.exports = router;
