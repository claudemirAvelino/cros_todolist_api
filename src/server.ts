import express from 'express';
import logger from 'morgan';
import './database'
import { routes } from './routes'
const app = express();

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("../swaggerConfig.ts")

app.use(
    logger('dev'),
    express.json(),
    express.urlencoded({ extended: false }),
    routes
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(3333, () => {
    console.log('Server is running on port http://localhost:3333')
});
