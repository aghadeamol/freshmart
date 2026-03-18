import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar({ onCartOpen, searchQuery, onSearchChange }) {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="/" className="logo">
          <span className="logo-icon">🛒</span>
          <span className="logo-text">FreshMart</span>
        </a>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search groceries…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => onSearchChange("")}>
              ✕
            </button>
          )}
        </div>

        <button className="cart-btn" onClick={onCartOpen}>
          <span className="cart-icon">🛍️</span>
          <span className="cart-label">Cart</span>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
