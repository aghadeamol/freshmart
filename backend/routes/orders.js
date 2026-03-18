const express = require("express");
const router = express.Router();

const orders = [];
let orderCounter = 1001;

// POST place an order
router.post("/", (req, res) => {
  const { customer, items, total } = req.body;
  if (!customer || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Customer info and items are required" });
  }
  const order = {
    id: `ORD-${orderCounter++}`,
    customer,
    items,
    total,
    status: "confirmed",
    placedAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  };
  orders.push(order);
  res.status(201).json({ success: true, data: order });
});

// GET all orders (admin)
router.get("/", (req, res) => {
  res.json({ success: true, data: orders, total: orders.length });
});

// GET single order by ID
router.get("/:id", (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });
  res.json({ success: true, data: order });
});

module.exports = router;
