const amqp = require('amqplib');
const uri = 'amqp://localhost:5672';

let connection = null;
let channel = null;

const getConnection = async () => {
    if (!connection) {
        connection = await amqp.connect(uri);
    }
    return connection;
};

const getChannel = async () => {
    if (!channel) {
        const conn = await getConnection();
        channel = await conn.createChannel();
    }
    return channel;
};

module.exports = { getConnection, getChannel };