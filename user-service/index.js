const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.join(__dirname, ".env");
// console.log("Loading .env file from:", envPath); // Debugging output

// Read the raw content of the .env file
const envContent = fs.readFileSync(envPath, "utf8");
// console.log("Raw .env file content:", envContent); // Debugging output

const result = dotenv.config({ path: envPath });

if (result.error) {
    // console.error("Error loading .env file:", result.error); // Debugging output
} else {
    // console.log(".env file loaded successfully:", result.parsed); // Debugging output
}

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// console.log("Loaded PORT:", process.env.PORT); // Debugging output

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});

const { Pool } = require("pg");
// require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch(err => console.error("PostgreSQL Connection Error ❌", err));