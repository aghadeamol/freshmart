const express = require("express");
const router = express.Router();

// In-memory cart store (keyed by sessionId)
const carts = {};

function getCart(sessionId) {
  if (!carts[sessionId]) carts[sessionId] = { items: [] };
  return carts[sessionId];
}

// GET cart
router.get("/:sessionId", (req, res) => {
  const cart = getCart(req.params.sessionId);
  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ success: true, data: { ...cart, total: parseFloat(total.toFixed(2)) } });
});

// POST add item to cart
router.post("/:sessionId/add", (req, res) => {
  const { product } = req.body;
  if (!product) return res.status(400).json({ success: false, message: "Product required" });
  const cart = getCart(req.params.sessionId);
  const existing = cart.items.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.items.push({ ...product, qty: 1 });
  }
  res.json({ success: true, data: cart });
});

// PATCH update item quantity
router.patch("/:sessionId/item/:productId", (req, res) => {
  const { qty } = req.body;
  const cart = getCart(req.params.sessionId);
  const item = cart.items.find((i) => i.id === parseInt(req.params.productId));
  if (!item) return res.status(404).json({ success: false, message: "Item not in cart" });
  item.qty = qty;
  if (item.qty <= 0) cart.items = cart.items.filter((i) => i.id !== parseInt(req.params.productId));
  res.json({ success: true, data: cart });
});

// DELETE remove item
router.delete("/:sessionId/item/:productId", (req, res) => {
  const cart = getCart(req.params.sessionId);
  cart.items = cart.items.filter((i) => i.id !== parseInt(req.params.productId));
  res.json({ success: true, data: cart });
});

// DELETE clear cart
router.delete("/:sessionId", (req, res) => {
  carts[req.params.sessionId] = { items: [] };
  res.json({ success: true, message: "Cart cleared" });
});

module.exports = router;
