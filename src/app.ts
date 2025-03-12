import express from 'express';
import clientRoutes from './routes/client.routes';
import saleRoutes from './routes/sale.routes';
import productRoutes from './routes/product.routes';
import cors from 'cors';
import { logger } from './utils/logger';
import { Request, Response } from 'express';

const app = express();
// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // If your frontend is sending cookies
};
// Configuración de middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.use(logger());

app.get('/', (req: Request, res: Response) => {
  res.send('Wellcome...');
});

app.use('/v1/client', clientRoutes);
app.use('/v1/sale', saleRoutes);
app.use('/v1/product', productRoutes);

export default app;
