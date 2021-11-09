import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const db = require('./config/keys').mongoURI;

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(db)
  .then(() => console.log('Connected to MongoDB successfully'))
  // .catch((err) => console.log(err));
  .catch((err) => console.log('no connection'));
