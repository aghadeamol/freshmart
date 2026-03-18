import "./OrderSuccess.css";

export default function OrderSuccess({ order, onContinue }) {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">🎉</div>
        <h1 className="success-title">Order Placed!</h1>
        <p className="success-sub">
          Thank you, <strong>{order.customer.name}</strong>! Your groceries are on their way.
        </p>

        <div className="order-detail">
          <div className="order-detail-row">
            <span>Order ID</span>
            <span className="order-id">{order.id}</span>
          </div>
          <div className="order-detail-row">
            <span>Total Paid</span>
            <span className="highlight">${order.total.toFixed(2)}</span>
          </div>
          <div className="order-detail-row">
            <span>Delivery to</span>
            <span>{order.customer.address}</span>
          </div>
          <div className="order-detail-row">
            <span>Est. Delivery</span>
            <span className="highlight">~60 minutes</span>
          </div>
        </div>

        <div className="order-items-preview">
          {order.items.map((item) => (
            <span key={item.id} className="order-item-emoji" title={item.name}>
              {item.emoji}
            </span>
          ))}
        </div>

        <button className="continue-btn" onClick={onContinue}>
          Continue Shopping →
        </button>
      </div>
    </div>
  );
}
