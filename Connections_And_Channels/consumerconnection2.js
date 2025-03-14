const amqp = require('amqplib');
const uri = 'amqp://localhost:5672';//

const consume = async () => {
    try {
        const connection = await amqp.connect(uri);
        let channel = await connection.createChannel();

        await channel.assertExchange('fanoutTest', 'fanout')
        await channel.assertQueue("", { exclusive: false });
        await channel.bindQueue("", "fanoutTest", "");
        await channel.consume("", message => {
            let msg = message.content.toString();
            console.log(`${msg} in consumer 2`);
            //Hier een check wat de opdracht in de message inhoud en wat er mee moet gebeuren.
            //Bedenk of je bij het uitlezen van de payload dat hier moet doen of dat het beter 
            //is om daar een aparte module/class voor aan te maken 
            channel.ack(message);
        });
    } catch (error) {
        console.log(`error is: ${error}`);
    }
}
module.exports = consume;