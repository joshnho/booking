import express from 'express';
import { readdirSync } from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';

require('dotenv').config();
const morgan = require('morgan');

const app = express();

// DB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {});
    console.log('DB connected');
  } catch (error) {
    console.log('DB Error =>', error);
  }
};
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Route middleware
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
