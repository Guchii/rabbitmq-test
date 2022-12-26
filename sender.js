const { connect } = require("amqplib");

const crypto = require("crypto");

const main = async () => {
    const queue = "orders";

    const connection = await connect("amqp://localhost");

    const channel = await connection.createChannel();

    // channel.assertQueue(queue, { durable: false });

    setInterval(() => {
        const randomUUID = crypto.randomUUID();
        channel.publish("orders", "neworder", Buffer.from(JSON.stringify({ orderId: randomUUID })))
    }, 3000)
}

main();