import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import fs from 'fs';
import path from 'path';

const loadSchemas = (schemasDir: string) => {
    const schemas: { [key: string]: any } = {};
    const files = fs.readdirSync(schemasDir);

    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(schemasDir, file);
            const schemaContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            Object.keys(schemaContent).forEach(key => {
                schemas[key] = schemaContent[key];
            });
        }
    });

    return schemas;
};

const swaggerOptions  = {
    definition: {
        info: {
            title: 'API Generic Service',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3333',
            },
        ],
        components: {
            schemas: loadSchemas(path.join(__dirname, 'routes/schemas')), // Carrega todos os esquemas JSON
        },
    },
    apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsDoc(swaggerOptions);

const swaggerSetup = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerSetup;
