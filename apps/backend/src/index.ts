import { Request, Response, NextFunction } from 'express';
const morgan = require('morgan');
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/product';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/products', productRoutes);

app.use((error: any, req: Request, res: Response, _next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  
  res.status(status).json({ 
    message: message, 
    data: data 
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Backend is on!',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const start = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Backend launched: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Launch error:', error);
  }
};

start();