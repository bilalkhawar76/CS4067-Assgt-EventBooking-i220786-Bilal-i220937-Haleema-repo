// const amqp = require("amqplib");
// const Notification = require("./models/Notification");

// const RABBITMQ_URL = process.env.RABBITMQ_URL;
// const QUEUE_NAME = process.env.QUEUE_NAME;

// async function consumeMessages() {
//     try {
//         const connection = await amqp.connect(RABBITMQ_URL);
//         const channel = await connection.createChannel();

//         await channel.assertQueue(QUEUE_NAME, { durable: false });
//         console.log(`📥 Waiting for booking messages in queue: ${QUEUE_NAME}`);

//         channel.consume(QUEUE_NAME, async (msg) => {
//             if (msg !== null) {
//                 const booking = JSON.parse(msg.content.toString());
//                 console.log("📩 New booking notification received:", booking);

//                 // Store notification in MongoDB
//                 await Notification.create({
//                     userId: booking.userId,
//                     eventId: booking.eventId,
//                     message: `Booking confirmed for event ${booking.eventId}`,
//                 });

//                 console.log(`📧 Notification stored for user ${booking.userId}`);

//                 channel.ack(msg);
//             }
//         });
//     } catch (error) {
//         console.error("❌ RabbitMQ Consumer Error:", error);
//     }
// }

// module.exports = { consumeMessages };




const amqp = require("amqplib");
const Notification = require("./models/Notification");
const nodemailer = require("nodemailer");
require("dotenv").config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const QUEUE_NAME = "booking_notifications";

// ✅ Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Function to send an email
async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

// ✅ Function to consume messages from RabbitMQ
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

        // ✅ Fetch user's email from User Service
        const userEmail = await getUserEmail(booking.userId);
        if (userEmail) {
          await sendEmail(
            userEmail,
            "Booking Confirmation",
            `Hello! 🎉 Your booking for Event ID ${booking.eventId} has been confirmed!`
          );
        }

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("❌ RabbitMQ Consumer Error:", error);
  }
}

// ✅ Function to fetch user's email from User Service
async function getUserEmail(userId) {
  try {
    const response = await fetch(`http://localhost:5001/users/${userId}`);
    const userData = await response.json();
    return userData.email;
  } catch (error) {
    console.error("❌ Error fetching user email:", error);
    return null;
  }
}

module.exports = { consumeMessages };
