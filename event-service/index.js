const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/events", eventRoutes);

const PORT = process.env.PORT || 5002;

connectDB(); // Connect to MongoDB

app.listen(PORT, () => {
  console.log(`🚀 Event Service running on port ${PORT}`);
});