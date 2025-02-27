const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Event Service is running');
});

app.listen(PORT, () => {
    console.log(`Event Service running on port ${PORT}`);
});


const mongoose = require("mongoose");
// require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch(err => console.error("MongoDB Connection Error ❌", err));