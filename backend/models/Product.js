const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  emoji: { type: String, required: true },
  badge: { type: String, default: null },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
