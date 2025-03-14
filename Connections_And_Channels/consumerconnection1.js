const { getChannel } = require('./sharedRabbitMqResource');

const consume = async () => {
    try {
        const channel = await getChannel();

        await channel.assertExchange('fanoutTest', 'fanout');
        const q = await channel.assertQueue("", { exclusive: false });
        await channel.bindQueue(q.queue, "fanoutTest", "");
        await channel.consume(q.queue, message => {
            let msg = message.content.toString();
            console.log(`${msg} in consumer 1`);
            channel.ack(message);
        });

    } catch (error) {
        console.error(`error in 1: ${error}`);
    }
};

module.exports = consume;