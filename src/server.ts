import 'reflect-metadata';
import 'dotenv/config'
import './shared/container'

import express from 'express';
import cors from 'cors';

import { errorHandler } from './shared/middlewares/errorHandler.middleware';
import { initializeDatabase } from './config/typeOrm';
import routes from './infra/routes';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

export const app = express();
const port = process.env.PORT || 3000;;

app.use(cors());

app.use(express.json());

app.use(routes);

const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Server is running' });
});

app.use(errorHandler);

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});