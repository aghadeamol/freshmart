const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      qty: Number,
      emoji: String,
      unit: String,
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "confirmed" },
  placedAt: { type: Date, default: Date.now },
  estimatedDelivery: { type: Date },
});

module.exports = mongoose.model("Order", orderSchema);
