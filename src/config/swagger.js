import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPath = path.join(__dirname, '../docs/openapi.json');
const swaggerFile = fs.readFileSync(swaggerPath, 'utf-8');
const swaggerDocument = JSON.parse(swaggerFile);

export { swaggerUi, swaggerDocument };
