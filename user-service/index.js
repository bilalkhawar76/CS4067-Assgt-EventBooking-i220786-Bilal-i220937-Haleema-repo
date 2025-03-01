const express = require("express");
const dotenv = require("dotenv");
const { initDB } = require("./models");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  await initDB();
  console.log(`🚀 User Service running on port ${PORT}`);
});
