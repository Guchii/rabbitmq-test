const { connect } = require("amqplib");

const main = async () => {
  const connection = await connect("amqp://localhost");

  const channel = await connection.createChannel();

  const queue = "orders";

  channel.assertQueue(queue, { durable: false });

  channel.assertExchange("orders", "direct", { durable: false });

  channel.bindQueue(queue, "orders", "neworder")

  channel.consume(
    queue,
    (msg) => {
      if (msg) {
        console.log((msg.content.toString()), (msg.fields.routingKey));
      }
    }
  );

}

main();