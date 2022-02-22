const amqp = require('amqplib');
const uri  = 'amqp://localhost:5672';


const publish = async (msg)=>{ 
    try {
          console.log('Running....');
          const connection = await amqp.connect(uri);
          channel          = await connection.createChannel();
          
          await channel.assertExchange("fanoutTest","fanout"); 
          await channel.publish("fanoutTest","",Buffer.from(msg));  
          
          console.log('message is naar queue verzonden :'+ msg); 
        }catch (error) {
          console.log ('err in publisher : ' +error);
    }
  }

  module.exports = publish;