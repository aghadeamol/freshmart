import { useState, useEffect, useRef } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryBar from "./components/CategoryBar";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import { fetchProducts } from "./services/api";
import { categories } from "./data/products";
import "./App.css";

function AppContent() {
  const [page, setPage] = useState("home"); // home | checkout | success
  const [order, setOrder] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, [activeCategory, searchQuery]);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await fetchProducts(activeCategory, searchQuery);
      setProducts(data);
    } catch {
      console.error("Failed to fetch products from backend.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function handleShopNow() {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleOrderSuccess(placedOrder) {
    setOrder(placedOrder);
    setPage("success");
  }

  if (page === "success" && order) {
    return <OrderSuccess order={order} onContinue={() => { setPage("home"); setOrder(null); }} />;
  }

  if (page === "checkout") {
    return <Checkout onBack={() => setPage("home")} onSuccess={handleOrderSuccess} />;
  }

  const catLabel = categories.find(c => c.id === activeCategory)?.label || "All";

  return (
    <>
      <Navbar
        onCartOpen={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => { setSearchQuery(q); setActiveCategory("all"); }}
      />
      <Hero onShopNow={handleShopNow} />
      <CategoryBar categories={categories} active={activeCategory} onSelect={(id) => { setActiveCategory(id); setSearchQuery(""); }} />

      <main className="products-section" ref={productsRef}>
        <div className="products-container">
          <div className="products-header">
            <h2 className="section-title">
              {searchQuery ? `Results for "${searchQuery}"` : catLabel}
            </h2>
            <p className="products-count">{products.length} items</p>
          </div>

          {loading ? (
            <div className="loading-grid">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton-card" />)}
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No results found</h3>
              <p>Try a different search or browse another category.</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setCartOpen(false); setPage("checkout"); }}
      />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
