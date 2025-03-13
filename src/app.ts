import express, { Request, Response } from 'express';
import clientRoutes from './routes/client.routes';
import saleRoutes from './routes/sale.routes';
import productRoutes from './routes/product.routes';
import cors from 'cors';
import { logger } from './utils/logger';

const app = express();
const allowedOrigins = ['http://localhost:8080', 'https://sys-frontend-develop-3y58e.ondigitalocean.app'];
// Configure CORS options
const corsOptions = {
  origin: allowedOrigins, // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // If your frontend is sending cookies
};
// Configuración de middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.use(logger());

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenido...');
});

app.use('/v1/client', clientRoutes);
app.use('/v1/sale', saleRoutes);
app.use('/v1/product', productRoutes);

export default app;
