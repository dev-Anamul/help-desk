import { assignTicketEmailHandler } from '@/api/v1/assign-ticket';
import amqp from 'amqplib';

const assignTicketReceiver = async () => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URL as string);
  const channel = await connection.createChannel();

  const queue = 'assign-ticket';

  await channel.assertQueue(queue, {
    durable: true,
  });

  await channel.prefetch(1);

  channel.consume(queue, async (message) => {
    if (!message) return;

    const input = JSON.parse(message.content.toString());
    console.log('Received message:', input);

    // send email
    assignTicketEmailHandler()
      .then(() => {
        console.log('Email sent successfully');
        channel.ack(message);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  });
};

assignTicketReceiver();
assignTicketReceiver();
