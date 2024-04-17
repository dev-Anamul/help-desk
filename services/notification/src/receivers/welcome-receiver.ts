import { welcomeEmailHandler } from '@/api/v1/welcome';
import amqp from 'amqplib';

const welcomeReceiver = async () => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URL as string);
  const channel = await connection.createChannel();

  const queue = 'welcome';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (message) => {
    if (!message) return;

    const input = JSON.parse(message.content.toString());
    console.log('Received message:', input);

    // send email
    await welcomeEmailHandler();

    channel.ack(message);
  });
};

welcomeReceiver();
