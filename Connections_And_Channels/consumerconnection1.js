const amqp = require('amqplib');
const uri = 'amqp://localhost:5672';//

const consume = async ()=>{
    try { 
        const connection = await await amqp.connect(uri);
        channel = await connection.createChannel();
        
        await channel.assertExchange('fanoutTest','fanout')
        await channel.assertQueue("",{ exclusive: false});
        await channel.bindQueue("","fanoutTest","");
        await channel.consume("", message =>{
            let msg = message.content.toString();
            console.log(`${msg} in consumer 1`);  
        }); 
         channel.ack(message);
    } catch (error) {
        console.log (`error is: ${error}`);
    }
}
module.exports = consume;