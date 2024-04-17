import { closeTicketEmailHandler } from '@/api/v1/close-ticket';
import amqp from 'amqplib';

const closeTicketReceiver = async () => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URL as string);
  const channel = await connection.createChannel();

  const queue = 'close-ticket';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (message) => {
    if (!message) return;

    const input = JSON.parse(message.content.toString());
    console.log('Received message:', input);

    // send email
    await closeTicketEmailHandler();

    // acknowledge the message
    channel.ack(message);
  });
};

closeTicketReceiver();
