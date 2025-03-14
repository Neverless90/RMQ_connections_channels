const amqp = require('amqplib');
const uri = 'amqp://localhost:5672';

let connection = null;
let channel = null;

const getConnection = async () => {
    if (!connection) {
        try {
            connection = await amqp.connect(uri);
            console.log('RabbitMQ connection established');
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error('Failed to establish RabbitMQ connection: Connection refused. Is the RabbitMQ server running?');
            } else {
                console.error('Failed to establish RabbitMQ connection:', error);
            }
            throw error;
        }
    }
    return connection;
};

const getChannel = async () => {
    if (!channel) {
        try {
            const conn = await getConnection();
            channel = await conn.createChannel();
            console.log('RabbitMQ channel created');
        } catch (error) {
            console.error('Failed to create RabbitMQ channel:', error);
            throw error;
        }
    }
    return channel;
};

module.exports = { getConnection, getChannel };