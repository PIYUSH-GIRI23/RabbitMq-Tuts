import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

const QUEUE = 'task_queue_1';

const RABBIT_URL = `amqp://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}`;

export async function startConsumer1() {
  try {
    console.log("[Consumer1] Connecting to RabbitMQ...");

    const conn = await amqp.connect(RABBIT_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });

    console.log(`[Consumer1] Waiting for messages in ${QUEUE}`);

    channel.consume(
      QUEUE,
      (msg) => {
        if (msg) {
          let payload = msg.content.toString();
          try { payload = JSON.parse(payload); } catch (_) {}

          console.log(`[Consumer1] Received:`, payload);

          channel.ack(msg);
        }
      },
      { noAck: false }
    );

  } catch (error) {
    console.error("[Consumer1] Error:", error.message);
  }
}
