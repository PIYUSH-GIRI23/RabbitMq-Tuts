import amqp from 'amqplib';

import dotenv from 'dotenv';
dotenv.config();

const RABBITMQ_PORT = process.env.PORT 
const RABBITMQ_HOST = process.env.HOST 
const RABBITMQ_USERNAME = process.env.USERNAME 
const RABBITMQ_PASSWORD = process.env.PASSWORD 

const RABBITMQ_URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

let connection;
let channel1;

export const connectRabbitMQ = async () => {
    try {
        if(!connection) {
            connection = await amqp.connect(RABBITMQ_URL);
            console.log('Connected to RabbitMQ');
        }

        if(!channel1) {
            channel1 = await connection.createChannel();
            await channel1.assertQueue('task_queue_1', { durable: true }); 
            await channel1.assertQueue('task_queue_2', { durable: true });
            console.log('Channel 1 created and queue asserted');
        }

        return { connection, channel1 };

    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
        throw error;
    }
};

