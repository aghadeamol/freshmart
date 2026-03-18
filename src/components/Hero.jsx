import "./Hero.css";

export default function Hero({ onShopNow }) {
  const floats = ["🍎", "🥦", "🍋", "🥕", "🍓", "🥑", "🍇", "🌽"];

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">✨ Fresh · Local · Fast</p>
        <h1 className="hero-title">
          Groceries,<br />
          <span className="hero-accent">Delivered Fresh</span>
        </h1>
        <p className="hero-sub">
          Farm-to-door in under 60 minutes. No minimum order. Always fresh.
        </p>
        <div className="hero-actions">
          <button className="hero-cta" onClick={onShopNow}>
            Shop Now →
          </button>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">32+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">60 min</span>
              <span className="stat-label">Delivery</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">4.9★</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-art">
        {floats.map((emoji, i) => (
          <div key={i} className={`hero-float f${i + 1}`}>{emoji}</div>
        ))}
      </div>
    </section>
  );
}
