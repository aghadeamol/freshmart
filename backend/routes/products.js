const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products (with optional category filter)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== "all") {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive search
    }
    
    const products = await Product.find(query);
    res.json({ success: true, data: products, total: products.length });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching products", error });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching product", error });
  }
});

module.exports = router;
