const { getChannel } = require('./sharedRabbitMqResource');

const consume = async () => {
    try {
        const channel = await getChannel();

        await channel.assertExchange('fanoutTest', 'fanout');
        const q = await channel.assertQueue("", { exclusive: false });
        await channel.bindQueue(q.queue, "fanoutTest", "");
        await channel.consume(q.queue, message => {
            let msg = message.content.toString();
            console.log(`${msg} in consumer 2`);
            channel.ack(message);
        });

    } catch (error) {
        console.log(`error is: ${error}`);
    }
};

module.exports = consume;