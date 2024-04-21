import { deleteAccountEmailHandler } from '@/api/v1/delete-account';
import amqp from 'amqplib';

const deleteAccountReceiver = async () => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URL as string);
  const channel = await connection.createChannel();

  const queue = 'delete-account';

  await channel.assertQueue(queue, {
    durable: true,
  });

  await channel.prefetch(1);

  channel.consume(
    queue,
    async (message) => {
      if (!message) return;

      const input = JSON.parse(message.content.toString());
      console.log('Received message:', input);

      // send email
      deleteAccountEmailHandler()
        .then(() => {
          console.log('Email sent successfully');

          // acknowledge the message
          channel.ack(message);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
    },
    { noAck: false }
  );
};

deleteAccountReceiver();
deleteAccountReceiver();
