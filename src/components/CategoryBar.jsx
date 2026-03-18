import "./CategoryBar.css";

export default function CategoryBar({ categories, active, onSelect }) {
  return (
    <div className="categories-section">
      <div className="container">
        <div className="categories-scroll" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-btn${active === cat.id ? " cat-btn--active" : ""}`}
              onClick={() => onSelect(cat.id)}
              role="tab"
              aria-selected={active === cat.id}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
