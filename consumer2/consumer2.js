import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

const QUEUE = 'task_queue_2';

const RABBIT_URL = `amqp://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}`;

export async function startConsumer2() {
  try {
    console.log("[Consumer2] Connecting to RabbitMQ...");

    const conn = await amqp.connect(RABBIT_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });

    console.log(`[Consumer2] Waiting for messages in ${QUEUE}`);

    channel.consume(
      QUEUE,
      (msg) => {
        if (msg) {
          let payload = msg.content.toString();
          try { payload = JSON.parse(payload); } catch (_) {}

          console.log(`[Consumer2] Received:`, payload);

          channel.ack(msg);
        }
      },
      { noAck: false }
    );

  } catch (error) {
    console.error("[Consumer2] Error:", error.message);
  }
}
