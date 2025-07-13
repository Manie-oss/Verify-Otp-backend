// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API Docs',
      version: '1.0.0',
    },
  },
  apis: ['./index.js'], // Files with JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi, swaggerSpec };
