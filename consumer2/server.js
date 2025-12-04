import express from 'express';
import dotenv from 'dotenv';
import { startConsumer2 } from './consumer2.js';
dotenv.config();

const app = express();

app.listen(4000, async() => {
    console.log('Server is running on port 4000');
    await startConsumer2();
});

app.get('/', (req, res) => {
  res.send('Hello from COnsumer2');
});