import express from 'express';
import dotenv from 'dotenv';
import { startConsumer1 } from './consumer1.js';
dotenv.config();

const app = express();

app.listen(5000, async() => {
    console.log('Server is running on port 4000');
    await startConsumer1();
});

app.get('/', (req, res) => {
  res.send('Hello from Consumer1');
});