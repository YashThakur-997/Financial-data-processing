// Swagger setup for Express
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Financial Data Processing API',
      version: '1.0.0',
      description: 'API documentation for Financial Data Processing',
    },
    servers: [
      {
        url: 'https://financial-data-processing-ekfa.onrender.com',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js', './docs/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
