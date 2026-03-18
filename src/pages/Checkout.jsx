import { useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/api";
import "./Checkout.css";

export default function Checkout({ onBack, onSuccess }) {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const order = await placeOrder({ customer: form, items: cart, total: totalPrice });
      clearCart();
      onSuccess(order);
    } catch {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const delivery = totalPrice > 0 ? 0 : 0;

  return (
    <div className="checkout-page">
      <div className="checkout-inner">
        <button className="back-btn" onClick={onBack}>← Back to shopping</button>
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-grid">
          {/* Customer Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2 className="form-section-title">Delivery Details</h2>

            {[
              { key: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
              { key: "email", label: "Email", placeholder: "john@example.com", type: "email" },
              { key: "phone", label: "Phone", placeholder: "+1 234 567 8900", type: "tel" },
              { key: "address", label: "Delivery Address", placeholder: "123 Main St, City, State", type: "text" },
            ].map(({ key, label, placeholder, type }) => (
              <div className="form-group" key={key}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  className={`form-input${errors[key] ? " input-error" : ""}`}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }}
                />
                {errors[key] && <p className="error-msg">{errors[key]}</p>}
              </div>
            ))}

            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <div className="payment-option active">
                <span>💳</span> Cash on Delivery
              </div>
            </div>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? "Placing Order…" : `Place Order · $${totalPrice.toFixed(2)}`}
            </button>
          </form>

          {/* Order Summary */}
          <div className="order-summary">
            <h2 className="form-section-title">Order Summary</h2>
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span className="summary-emoji">{item.emoji}</span>
                  <span className="summary-name">{item.name}</span>
                  <span className="summary-qty">×{item.qty}</span>
                  <span className="summary-price">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span><span className="free">Free</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span><span>${(totalPrice + delivery).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
