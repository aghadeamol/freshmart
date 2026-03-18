import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart, cart, increment, decrement } = useCart();
  const cartItem = cart.find((i) => i.id === product.id);

  const badgeClass = product.badge
    ? ["Sale", "New"].includes(product.badge)
      ? "badge badge--hot"
      : "badge badge--green"
    : "";

  const stars = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));

  return (
    <div className="product-card">
      {product.badge && (
        <span className={badgeClass}>{product.badge}</span>
      )}

      <div className="product-emoji-wrap">
        <span className="product-emoji">{product.emoji}</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-unit">{product.unit}</p>
        <div className="product-rating">
          <span className="stars">{stars}</span>
          <span className="reviews">({product.reviews})</span>
        </div>
      </div>

      <div className="product-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        {cartItem ? (
          <div className="qty-controls">
            <button className="qty-btn" onClick={() => decrement(product.id)}>−</button>
            <span className="qty-count">{cartItem.qty}</span>
            <button className="qty-btn" onClick={() => increment(product.id)}>+</button>
          </div>
        ) : (
          <button className="add-btn" onClick={() => addToCart(product)}>
            Add +
          </button>
        )}
      </div>
    </div>
  );
}
