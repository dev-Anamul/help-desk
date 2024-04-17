import { deleteTicketEmailHandler } from '@/api/v1/delete-ticket';
import amqp from 'amqplib';

const deleteTicketReceiver = async () => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URL as string);
  const channel = await connection.createChannel();

  const queue = 'delete-ticket';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (message) => {
    if (!message) return;

    const input = JSON.parse(message.content.toString());
    console.log('Received message:', input);

    // send email
    await deleteTicketEmailHandler();

    channel.ack(message);
  });
};

deleteTicketReceiver();
