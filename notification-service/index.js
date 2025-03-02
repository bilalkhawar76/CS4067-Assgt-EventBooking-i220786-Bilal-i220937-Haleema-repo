require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const { consumeMessages } = require("./rabbitmq");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Start RabbitMQ Consumer
consumeMessages();

// API to get all notifications
const Notification = require("./models/Notification");

app.get("/notifications", async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`🚀 Notification Service running on port ${PORT}`);
});
