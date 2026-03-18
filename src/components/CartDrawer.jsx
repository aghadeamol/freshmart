import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cart, removeFromCart, increment, decrement, totalPrice, totalItems, clearCart } = useCart();

  return (
    <>
      <div className={`cart-overlay${isOpen ? " active" : ""}`} onClick={onClose} />
      <aside className={`cart-drawer${isOpen ? " open" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">Your Cart 🛍️</h2>
          <button className="cart-close-btn" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <small>Browse and add some fresh items!</small>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-emoji">{item.emoji}</div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-unit">{item.unit}</p>
                    <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => decrement(item.id)}>−</button>
                      <span className="qty-count">{item.qty}</span>
                      <button className="qty-btn" onClick={() => increment(item.id)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="cart-row">
                <span>Delivery</span>
                <span className="free">Free</span>
              </div>
              <div className="cart-row cart-total">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={onCheckout}>
                Proceed to Checkout →
              </button>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
