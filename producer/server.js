import express from 'express';
import dotenv from 'dotenv';
import producerRouter from './broker/producer.js';
dotenv.config();

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/producer', producerRouter);

app.get('/', (req, res) => {
  res.send('Hello from Producer');
});