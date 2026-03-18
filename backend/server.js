const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const ordersRouter = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "FreshMart API running 🛒" });
});

app.listen(PORT, () => {
  console.log(`✅ FreshMart backend running at http://localhost:${PORT}`);
});
