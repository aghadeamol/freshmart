const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
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
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cart", cartSchema);
