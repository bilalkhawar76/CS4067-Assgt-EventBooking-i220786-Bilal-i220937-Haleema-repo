const sequelize = require("../config/database");
const Booking = require("./Booking");

const initDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database & tables created!");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
  }
};

module.exports = { Booking, initDB };
