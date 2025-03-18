import express, { Request, Response } from 'express';
import clientRoutes from './routes/client.routes';
import saleRoutes from './routes/sale.routes';
import productRoutes from './routes/product.routes';
import employeeRoutes from './routes/employee.routes';
import cors from 'cors';
import { logger } from './utils/logger';

const app = express();
const allowedOrigins = ['http://localhost:8080', 'https://sys-frontend-develop-3y58e.ondigitalocean.app'];

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(logger());

app.get('/', (req: Request, res: Response) => {
  res.send('API REST nodejs and express...');
});

app.use('/v1/client', clientRoutes);
app.use('/v1/sale', saleRoutes);
app.use('/v1/product', productRoutes);
app.use('/v1/employee', employeeRoutes);

export default app;
