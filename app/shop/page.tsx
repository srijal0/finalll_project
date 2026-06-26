"use client";
import { useState } from "react";
import Header from "../components/header";

const categories = [
  { label: "Clothing", icon: "👕" },
  { label: "Bedding", icon: "🛏️" },
  { label: "Accessories", icon: "👜" },
  { label: "Furniture", icon: "🪑" },
  { label: "Home Goods", icon: "🏠" },
];

const sustainableFilters = ["Organic Material", "Fair Trade Cert", "Recycled Packaging"];

const sortOptions = ["Trending", "Price: Low to High", "Price: High to Low", "Newest", "Top Rated"];

const allProducts = [
  {
    name: "Organic Cotton Tee",
    price: "Rs300",
    rating: 4.9,
    reviews: 124,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    badge: "ORGANIC",
    badgeColor: "#4a7c59",
    category: "Clothing",
  },
  {
    name: "Linen Bedding Set",
    price: "Rs350",
    rating: 5.0,
    reviews: 88,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
    badge: "",
    category: "Bedding",
  },
  {
    name: "Bamboo Brush",
    price: "Rs300",
    rating: 4.7,
    reviews: 42,
    img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80",
    badge: "",
    category: "Accessories",
  },
  {
    name: "Modern Ceramic Vase",
    price: "Rs250",
    rating: 4.8,
    reviews: 210,
    img: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&q=80",
    badge: "BESTSELLER",
    badgeColor: "#888",
    category: "Home Goods",
  },
  {
    name: "Recycled Wool Slippers",
    price: "Rs450",
    rating: 4.9,
    reviews: 56,
    img: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80",
    badge: "",
    category: "Clothing",
  },
  {
    name: "Teak Serving Board",
    price: "Rs220",
    rating: 4.6,
    reviews: 34,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "",
    category: "Home Goods",
  },
  {
    name: "Hemp Throw Blanket",
    price: "Rs380",
    rating: 4.8,
    reviews: 67,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    badge: "ORGANIC",
    badgeColor: "#4a7c59",
    category: "Bedding",
  },
  {
    name: "Rattan Side Table",
    price: "Rs620",
    rating: 4.7,
    reviews: 29,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    badge: "",
    category: "Furniture",
  },
  {
    name: "Beeswax Candle Set",
    price: "Rs160",
    rating: 5.0,
    reviews: 91,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    badge: "",
    category: "Home Goods",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#c8a84b", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
    </span>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("Clothing");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sort, setSort] = useState("Trending");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleFilter = (f: string) => {
    setActiveFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );
  };

  const toggleWishlist = (i: number) => {
    setWishlist(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const filtered = allProducts.filter(p => p.category === activeCategory);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }

        .shop-layout {
          display: flex;
          gap: 0;
          min-height: calc(100vh - 60px);
        }

        .sidebar {
          width: 220px;
          flex-shrink: 0;
          background: #fff;
          padding: 28px 20px;
          border-right: 1px solid #ebebeb;
        }
        .sidebar-title {
          font-size: 16px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 18px;
        }
        .cat-list { list-style: none; margin-bottom: 32px; }
        .cat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          color: #555;
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
          margin-bottom: 2px;
        }
        .cat-item:hover { background: #f0f7f2; color: #2d4a2d; }
        .cat-item.active { background: #e8f4ec; color: #2d4a2d; font-weight: 700; }
        .cat-icon { font-size: 15px; width: 20px; text-align: center; }

        .filter-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #aaa;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .filter-list { list-style: none; }
        .filter-item {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 12px;
          cursor: pointer;
        }
        .filter-item input[type="checkbox"] {
          width: 15px; height: 15px;
          accent-color: #2d4a2d;
          cursor: pointer;
        }
        .filter-item label {
          font-size: 12px;
          color: #555;
          cursor: pointer;
        }

        .shop-main {
          flex: 1;
          padding: 32px 40px;
        }
        .shop-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        .shop-title {
          font-size: 26px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .shop-sub { font-size: 13px; color: #888; }

        .sort-wrap { position: relative; }
        .sort-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #444;
          cursor: pointer;
          white-space: nowrap;
        }
        .sort-btn:hover { border-color: #2d4a2d; }
        .sort-label { color: #aaa; font-weight: 400; margin-right: 4px; }
        .sort-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 6px);
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          min-width: 180px;
          z-index: 50;
          overflow: hidden;
        }
        .sort-option {
          padding: 10px 16px;
          font-size: 12px;
          cursor: pointer;
          color: #555;
          transition: background 0.15s;
        }
        .sort-option:hover { background: #f0f7f2; color: #2d4a2d; }
        .sort-option.active { color: #2d4a2d; font-weight: 700; }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 36px;
        }
        .prod-card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          transition: box-shadow 0.2s;
          cursor: pointer;
        }
        .prod-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.1); }
        .prod-img-wrap { position: relative; overflow: hidden; }
        .prod-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          transition: transform 0.35s;
        }
        .prod-card:hover .prod-img { transform: scale(1.04); }
        .prod-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 3px 8px;
          border-radius: 3px;
          color: #fff;
          text-transform: uppercase;
        }
        .wish-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          transition: transform 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        .wish-btn:hover { transform: scale(1.1); }
        .wish-btn.active { color: #e05252; }
        .prod-info { padding: 12px 14px 16px; }
        .prod-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 4px;
        }
        .prod-reviews { font-size: 11px; color: #aaa; }
        .prod-name { font-size: 13px; font-weight: 600; color: #1a1a1a; margin-bottom: 5px; }
        .prod-price { font-size: 15px; font-weight: 700; color: #2d4a2d; }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }
        .pg-btn {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1px solid #e0e0e0;
          background: #fff;
          font-size: 13px;
          font-weight: 600;
          color: #555;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .pg-btn:hover { border-color: #2d4a2d; color: #2d4a2d; }
        .pg-btn.active { background: #2d4a2d; color: #fff; border-color: #2d4a2d; }
        .pg-btn.arrow { font-size: 16px; }
        .pg-dots { color: #aaa; font-size: 13px; padding: 0 4px; }

        @media (max-width: 900px) {
          .sidebar { display: none; }
          .shop-main { padding: 24px 16px; }
          .product-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <Header activePage="Shop" />

      <div className="shop-layout">
        <aside className="sidebar">
          <h2 className="sidebar-title">Categories</h2>
          <ul className="cat-list">
            {categories.map(cat => (
              <li
                key={cat.label}
                className={`cat-item${activeCategory === cat.label ? " active" : ""}`}
                onClick={() => setActiveCategory(cat.label)}
              >
                <span className="cat-icon">{cat.icon}</span>
                {cat.label}
              </li>
            ))}
          </ul>

          <p className="filter-title">Sustainable Filters</p>
          <ul className="filter-list">
            {sustainableFilters.map(f => (
              <li key={f} className="filter-item">
                <input
                  type="checkbox"
                  id={f}
                  checked={activeFilters.includes(f)}
                  onChange={() => toggleFilter(f)}
                />
                <label htmlFor={f}>{f}</label>
              </li>
            ))}
          </ul>
        </aside>

        <main className="shop-main">
          <div className="shop-header">
            <div>
              <h1 className="shop-title">Eco-Friendly Collection</h1>
              <p className="shop-sub">Curated products for a conscious lifestyle.</p>
            </div>
            <div className="sort-wrap">
              <button className="sort-btn" onClick={() => setSortOpen(o => !o)}>
                <span className="sort-label">Sort by:</span>
                {sort}
                <span>▾</span>
              </button>
              {sortOpen && (
                <div className="sort-dropdown">
                  {sortOptions.map(o => (
                    <div
                      key={o}
                      className={`sort-option${sort === o ? " active" : ""}`}
                      onClick={() => { setSort(o); setSortOpen(false); }}
                    >
                      {o}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="product-grid">
            {filtered.length > 0 ? filtered.map((p, i) => (
              <div key={i} className="prod-card">
                <div className="prod-img-wrap">
                  <img className="prod-img" src={p.img} alt={p.name} />
                  {p.badge && (
                    <span className="prod-badge" style={{ background: p.badgeColor }}>
                      {p.badge}
                    </span>
                  )}
                  <button
                    className={`wish-btn${wishlist.includes(i) ? " active" : ""}`}
                    onClick={() => toggleWishlist(i)}
                    aria-label="Wishlist"
                  >
                    {wishlist.includes(i) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="prod-info">
                  <div className="prod-rating">
                    <Stars rating={p.rating} />
                    <span className="prod-reviews">{p.rating} ({p.reviews} reviews)</span>
                  </div>
                  <div className="prod-name">{p.name}</div>
                  <div className="prod-price">{p.price}</div>
                </div>
              </div>
            )) : (
              <div style={{ gridColumn: "span 3", textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: 14 }}>
                No products found in this category yet.
              </div>
            )}
          </div>

          <div className="pagination">
            <button className="pg-btn arrow" onClick={() => setPage(p => Math.max(1, p - 1))}>‹</button>
            {[1, 2, 3].map(n => (
              <button
                key={n}
                className={`pg-btn${page === n ? " active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <span className="pg-dots">...</span>
            <button
              className={`pg-btn${page === 8 ? " active" : ""}`}
              onClick={() => setPage(8)}
            >
              8
            </button>
            <button className="pg-btn arrow" onClick={() => setPage(p => Math.min(8, p + 1))}>›</button>
          </div>
        </main>
      </div>
    </>
  );
}