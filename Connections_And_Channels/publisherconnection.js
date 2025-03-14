const { getChannel } = require('./sharedRabbitMqResource');

const publish = async (msg) => {
  try {
    console.log('Running....');
    const channel = await getChannel();

    await channel.assertExchange("fanoutTest", "fanout");
    await channel.publish("fanoutTest", "", Buffer.from(msg));

    console.log('message is naar queue verzonden :' + msg);
  } catch (error) {
    console.log('err in publisher : ' + error);
  }
};

module.exports = publish;