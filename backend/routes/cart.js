const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

async function getCart(sessionId) {
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
    await cart.save();
  }
  return cart;
}

// GET cart
router.get("/:sessionId", async (req, res) => {
  try {
    const cart = await getCart(req.params.sessionId);
    const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const result = cart.toObject();
    result.total = parseFloat(total.toFixed(2));
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching cart", error });
  }
});

// POST add item to cart
router.post("/:sessionId/add", async (req, res) => {
  try {
    const { product } = req.body;
    if (!product) return res.status(400).json({ success: false, message: "Product required" });
    
    let cart = await getCart(req.params.sessionId);
    const existingIndex = cart.items.findIndex(i => i.id === product.id);
    
    if (existingIndex >= 0) {
      cart.items[existingIndex].qty += 1;
    } else {
      cart.items.push({ ...product, qty: 1 });
    }
    
    cart.updatedAt = Date.now();
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding item", error });
  }
});

// PATCH update item quantity
router.patch("/:sessionId/item/:productId", async (req, res) => {
  try {
    const { qty } = req.body;
    let cart = await getCart(req.params.sessionId);
    const item = cart.items.find(i => i.id === parseInt(req.params.productId));
    if (!item) return res.status(404).json({ success: false, message: "Item not in cart" });
    
    item.qty = qty;
    if (item.qty <= 0) {
      cart.items = cart.items.filter(i => i.id !== parseInt(req.params.productId));
    }
    
    cart.updatedAt = Date.now();
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating quantity", error });
  }
});

// DELETE remove item
router.delete("/:sessionId/item/:productId", async (req, res) => {
  try {
    let cart = await getCart(req.params.sessionId);
    cart.items = cart.items.filter(i => i.id !== parseInt(req.params.productId));
    cart.updatedAt = Date.now();
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing item", error });
  }
});

// DELETE clear cart
router.delete("/:sessionId", async (req, res) => {
  try {
    let cart = await getCart(req.params.sessionId);
    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();
    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error clearing cart", error });
  }
});

module.exports = router;
