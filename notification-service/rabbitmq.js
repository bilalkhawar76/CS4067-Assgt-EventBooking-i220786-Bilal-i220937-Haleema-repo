const amqp = require("amqplib");
const Notification = require("./models/Notification");

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

async function consumeMessages() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: false });
        console.log(`📥 Waiting for booking messages in queue: ${QUEUE_NAME}`);

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const booking = JSON.parse(msg.content.toString());
                console.log("📩 New booking notification received:", booking);

                // Store notification in MongoDB
                await Notification.create({
                    userId: booking.userId,
                    eventId: booking.eventId,
                    message: `Booking confirmed for event ${booking.eventId}`,
                });

                console.log(`📧 Notification stored for user ${booking.userId}`);

                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("❌ RabbitMQ Consumer Error:", error);
    }
}

module.exports = { consumeMessages };
