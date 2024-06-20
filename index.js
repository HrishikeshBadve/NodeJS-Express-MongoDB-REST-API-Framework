require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const drinkRoutes = require('./routes/drinkRoutes.js');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const myCache = require('./cache.js');
const app = express();

app.use(express.json());

// Swagger definition
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Beverage Catalog REST API',
        version: '1.0.0',
        description: 'This is a REST API for managing a beverage catalog',
        contact: {
          name: 'Hrishikesh Badve',
          email: 'hrishikesh.badve13@gmail.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000/api'
        }
      ]
    },
    apis: ['./routes/*.js', './models/*.js'] // Path to the API docs
};
  
// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);
  
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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
