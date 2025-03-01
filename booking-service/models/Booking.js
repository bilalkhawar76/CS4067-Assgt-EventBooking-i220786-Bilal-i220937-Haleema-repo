const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("confirmed", "pending", "cancelled"),
    defaultValue: "pending",
  },
  paymentStatus: {
    type: DataTypes.ENUM("paid", "unpaid"),
    defaultValue: "unpaid",
  },
}, {
  timestamps: true,
});

module.exports = Booking;
