const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST place an order
router.post("/", async (req, res) => {
  try {
    const { customer, items, total } = req.body;
    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Customer info and items are required" });
    }

    const orderCount = await Order.countDocuments();
    const newOrder = new Order({
      orderId: `ORD-${1001 + orderCount}`,
      customer,
      items,
      total,
      estimatedDelivery: new Date(Date.now() + 60 * 60 * 1000)
    });

    const savedOrder = await newOrder.save();
    
    // Convert to simple object to match what frontend expects
    const returnOrder = savedOrder.toObject();
    returnOrder.id = returnOrder.orderId;

    res.status(201).json({ success: true, data: returnOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error placing order", error });
  }
});

// GET all orders (admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ placedAt: -1 });
    res.json({ success: true, data: orders, total: orders.length });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders", error });
  }
});

// GET single order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    
    const returnOrder = order.toObject();
    returnOrder.id = returnOrder.orderId;
    
    res.json({ success: true, data: returnOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching order", error });
  }
});

module.exports = router;
