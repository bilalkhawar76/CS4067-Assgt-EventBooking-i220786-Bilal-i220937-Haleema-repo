const path = require("path");
const dotenv = require("dotenv");

// ✅ Force-load .env file using absolute path
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

console.log("Loaded PORT:", process.env.PORT); // Debugging output

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});


const mongoose = require("mongoose");
// require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch(err => console.error("MongoDB Connection Error ❌", err));