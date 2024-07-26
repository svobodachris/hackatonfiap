// config/swaggerConfig.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRMED',
      version: '1.0.0',
      description: 'API para a aplicação CRMED',
    },
    //
    components: {
        schemas: {
          Appointment: {
            type: 'object',
            required: ['doctorId', 'patientId', 'date', 'time'],
            properties: {
              doctorId: {
                type: 'string',
                description: 'ID do médico',
              },
              patientId: {
                type: 'string',
                description: 'ID do paciente',
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'Data da consulta',
              },
              time: {
                type: 'string',
                format: 'time',
                description: 'Hora da consulta',
              },
            },
          },
        },
      },
    },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
