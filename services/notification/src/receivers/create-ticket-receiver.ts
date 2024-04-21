import { createTicketEmailHandler } from '@/api/v1/create-ticket';
import amqp from 'amqplib';

export const createTicketReceiver = async () => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URL as string);
  const channel = await connection.createChannel();

  const queue = 'create-ticket';

  await channel.assertQueue(queue, { durable: true });
  await channel.prefetch(1);

  channel.consume(queue, async (message) => {
    if (!message) return;

    const input = JSON.parse(message.content.toString());
    console.log('Received message:', input);

    // send email
    createTicketEmailHandler()
      .then(() => {
        console.log('Email sent successfully');
        channel.ack(message);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  });
};

createTicketReceiver();
createTicketReceiver();
