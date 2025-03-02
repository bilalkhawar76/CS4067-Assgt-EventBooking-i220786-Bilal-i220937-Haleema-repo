const express = require("express");
const dotenv = require("dotenv");
const { initDB } = require("./models");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, async () => {
  await initDB();
  console.log(`🚀 Booking Service running on port ${PORT}`);
});
