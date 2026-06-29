import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

import routes from './routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'API CRM Pinheiro Seguros is running!' });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
