const express = require("express");
const router = express.Router();

const products = [
  { id: 1, name: "Organic Apples", category: "fruits", price: 3.99, unit: "per kg", emoji: "🍎", badge: "Organic", rating: 4.8, reviews: 124 },
  { id: 2, name: "Fresh Bananas", category: "fruits", price: 1.49, unit: "per bunch", emoji: "🍌", badge: null, rating: 4.6, reviews: 89 },
  { id: 3, name: "Ripe Strawberries", category: "fruits", price: 4.29, unit: "per punnet", emoji: "🍓", badge: "Sale", rating: 4.9, reviews: 201 },
  { id: 4, name: "Juicy Oranges", category: "fruits", price: 2.99, unit: "per kg", emoji: "🍊", badge: null, rating: 4.5, reviews: 67 },
  { id: 5, name: "Blueberries", category: "fruits", price: 5.49, unit: "per punnet", emoji: "🫐", badge: "Organic", rating: 4.7, reviews: 153 },
  { id: 6, name: "Watermelon", category: "fruits", price: 6.99, unit: "each", emoji: "🍉", badge: null, rating: 4.4, reviews: 45 },
  { id: 7, name: "Broccoli", category: "vegetables", price: 2.49, unit: "per head", emoji: "🥦", badge: "Organic", rating: 4.6, reviews: 78 },
  { id: 8, name: "Carrots", category: "vegetables", price: 1.29, unit: "per kg", emoji: "🥕", badge: null, rating: 4.5, reviews: 92 },
  { id: 9, name: "Cherry Tomatoes", category: "vegetables", price: 3.49, unit: "per punnet", emoji: "🍅", badge: "Sale", rating: 4.8, reviews: 110 },
  { id: 10, name: "Baby Spinach", category: "vegetables", price: 2.99, unit: "per bag", emoji: "🥬", badge: "Organic", rating: 4.7, reviews: 63 },
  { id: 11, name: "Sweet Corn", category: "vegetables", price: 0.79, unit: "each", emoji: "🌽", badge: null, rating: 4.3, reviews: 55 },
  { id: 12, name: "Bell Peppers", category: "vegetables", price: 3.99, unit: "3 pack", emoji: "🫑", badge: null, rating: 4.6, reviews: 84 },
  { id: 13, name: "Whole Milk", category: "dairy", price: 2.79, unit: "2L", emoji: "🥛", badge: null, rating: 4.8, reviews: 215 },
  { id: 14, name: "Greek Yogurt", category: "dairy", price: 3.99, unit: "500g", emoji: "🍶", badge: "Probiotic", rating: 4.9, reviews: 187 },
  { id: 15, name: "Cheddar Cheese", category: "dairy", price: 5.99, unit: "400g", emoji: "🧀", badge: null, rating: 4.7, reviews: 143 },
  { id: 16, name: "Salted Butter", category: "dairy", price: 3.49, unit: "250g", emoji: "🧈", badge: null, rating: 4.6, reviews: 98 },
  { id: 17, name: "Sourdough Loaf", category: "bakery", price: 4.99, unit: "each", emoji: "🍞", badge: "Freshly Baked", rating: 4.9, reviews: 256 },
  { id: 18, name: "Croissants", category: "bakery", price: 3.49, unit: "4 pack", emoji: "🥐", badge: null, rating: 4.8, reviews: 178 },
  { id: 19, name: "Blueberry Muffins", category: "bakery", price: 3.99, unit: "6 pack", emoji: "🧁", badge: "Sale", rating: 4.7, reviews: 122 },
  { id: 20, name: "Whole Wheat Bagels", category: "bakery", price: 3.29, unit: "6 pack", emoji: "🥯", badge: null, rating: 4.5, reviews: 87 },
  { id: 21, name: "Chicken Breast", category: "meat", price: 7.99, unit: "per kg", emoji: "🍗", badge: "Free Range", rating: 4.7, reviews: 134 },
  { id: 22, name: "Beef Mince", category: "meat", price: 9.49, unit: "per kg", emoji: "🥩", badge: null, rating: 4.6, reviews: 98 },
  { id: 23, name: "Salmon Fillet", category: "meat", price: 12.99, unit: "per kg", emoji: "🐟", badge: "Wild Caught", rating: 4.9, reviews: 210 },
  { id: 24, name: "Pork Sausages", category: "meat", price: 5.49, unit: "6 pack", emoji: "🌭", badge: null, rating: 4.4, reviews: 76 },
  { id: 25, name: "Tortilla Chips", category: "snacks", price: 2.99, unit: "200g", emoji: "🌮", badge: null, rating: 4.5, reviews: 189 },
  { id: 26, name: "Mixed Nuts", category: "snacks", price: 6.99, unit: "400g", emoji: "🥜", badge: "Unsalted", rating: 4.7, reviews: 144 },
  { id: 27, name: "Dark Chocolate", category: "snacks", price: 3.49, unit: "100g", emoji: "🍫", badge: "70% Cocoa", rating: 4.8, reviews: 231 },
  { id: 28, name: "Popcorn", category: "snacks", price: 1.99, unit: "100g", emoji: "🍿", badge: "Sale", rating: 4.3, reviews: 67 },
  { id: 29, name: "Orange Juice", category: "beverages", price: 3.49, unit: "1L", emoji: "🍊", badge: "Fresh Squeezed", rating: 4.7, reviews: 167 },
  { id: 30, name: "Sparkling Water", category: "beverages", price: 1.99, unit: "1.5L", emoji: "💧", badge: null, rating: 4.5, reviews: 93 },
  { id: 31, name: "Green Tea", category: "beverages", price: 4.49, unit: "20 bags", emoji: "🍵", badge: "Organic", rating: 4.8, reviews: 198 },
  { id: 32, name: "Cold Brew Coffee", category: "beverages", price: 5.99, unit: "500ml", emoji: "☕", badge: "New", rating: 4.9, reviews: 112 },
];

// GET all products (with optional category filter)
router.get("/", (req, res) => {
  const { category, search } = req.query;
  let result = [...products];
  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q));
  }
  res.json({ success: true, data: result, total: result.length });
});

// GET single product
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  res.json({ success: true, data: product });
});

module.exports = router;
