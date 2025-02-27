const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Booking Service is running');
});

app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});


const { Pool } = require("pg");
// require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch(err => console.error("PostgreSQL Connection Error ❌", err));
