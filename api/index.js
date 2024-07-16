import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Mongoose Connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

const app = express();

app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
