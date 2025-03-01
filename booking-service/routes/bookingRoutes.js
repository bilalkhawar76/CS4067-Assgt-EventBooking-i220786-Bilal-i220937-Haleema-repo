const amqp = require("amqplib");

const express = require("express");
const { Booking } = require("../models");
const { publishBookingEvent } = require("../rabbitmq");

const router = express.Router();


// async function publishBookingEvent(booking) {
//     try {
//       const connection = await amqp.connect("amqp://localhost");
//       const channel = await connection.createChannel();
//       const queue = "booking_notifications";
  
//       await channel.assertQueue(queue, { durable: false });
  
//       channel.sendToQueue(queue, Buffer.from(JSON.stringify(booking)));
//       console.log("📢 Booking event published:", booking);
  
//       setTimeout(() => {
//         connection.close();
//       }, 500);
//     } catch (error) {
//       console.error("❌ RabbitMQ Error:", error);
//     }
// }


// ✅ Create a booking
router.post("/", async (req, res) => {
  try {
    const { userId, eventId, status, paymentStatus } = req.body;
    if (!userId || !eventId) {
      return res.status(400).json({ error: "User ID and Event ID are required" });
    }
    
    const booking = await Booking.create({ userId, eventId, status, paymentStatus });

    // 🔹 Publish event to RabbitMQ
    await publishBookingEvent(booking);

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update booking status
router.put("/:id", async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    await booking.update({ status, paymentStatus });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    await booking.destroy();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;