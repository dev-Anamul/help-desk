import amqp from 'amqplib';

export const deleteAccountProducer = async (input: any) => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URL as string);
  const channel = await connection.createChannel();

  const queue = 'delete-account';

  await channel.assertQueue(queue, {
    durable: true,
  });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(input)), {
    persistent: true,
  });

  console.log('Message sent:', input);

  setTimeout(() => {
    connection.close();
  }, 1000);
};
