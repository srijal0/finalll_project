"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { allProducts } from "../data/products";

const recentSearches = ["Organic cotton", "Bamboo brush", "Linen bedding"];
const trendingSearches = ["Recycled wool", "Eco candles", "Hemp blanket", "Reusable glass bottle"];

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#c8a84b", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
    </span>
  );
}

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }

        .search-page {
          min-height: calc(100vh - 60px);
          padding: 48px 80px 80px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .search-input-wrap {
          position: relative;
          margin-bottom: 36px;
        }
        .search-input-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #9aa89a;
          display: flex;
        }
        .search-input {
          width: 100%;
          padding: 16px 18px 16px 48px;
          font-size: 16px;
          border: 1px solid #e0ddd4;
          border-radius: 10px;
          background: #fff;
          color: #1a1a1a;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .search-input::placeholder { color: #b3b0a6; }
        .search-input:focus {
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74,124,89,0.12);
        }
        .search-clear {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #aaa;
          font-size: 18px;
          cursor: pointer;
          line-height: 1;
          padding: 4px;
        }
        .search-clear:hover { color: #555; }

        .suggest-section { margin-bottom: 32px; }
        .suggest-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 14px;
        }
        .chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .chip {
          background: #fff;
          border: 1px solid #e6e4dc;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #444;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .chip:hover {
          border-color: #4a7c59;
          color: #2d4a2d;
          background: #f0f7f2;
        }

        .results-meta {
          font-size: 13px;
          color: #888;
          margin-bottom: 20px;
        }
        .results-meta strong { color: #1a1a1a; font-weight: 700; }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
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

        .no-results {
          text-align: center;
          padding: 70px 0;
        }
        .no-results-icon { font-size: 34px; margin-bottom: 12px; }
        .no-results-title {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
        }
        .no-results-sub { font-size: 13px; color: #999; }

        @media (max-width: 900px) {
          .search-page { padding: 32px 20px 60px; }
          .results-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <Header activePage="Shop" />

      <div className="search-page">
        <div className="search-input-wrap">
          <span className="search-input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            className="search-input"
            type="text"
            autoFocus
            placeholder="Search for anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery("")} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>

        {!trimmed && (
          <>
            <div className="suggest-section">
              <p className="suggest-label">Recent Searches</p>
              <div className="chip-row">
                {recentSearches.map((s) => (
                  <span key={s} className="chip" onClick={() => setQuery(s)}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="suggest-section">
              <p className="suggest-label">Trending</p>
              <div className="chip-row">
                {trendingSearches.map((s) => (
                  <span key={s} className="chip" onClick={() => setQuery(s)}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {trimmed && (
          <>
            <p className="results-meta">
              <strong>{results.length}</strong> result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>

            {results.length > 0 ? (
              <div className="results-grid">
                {results.map((p) => (
                  <div key={p.id} className="prod-card" onClick={() => router.push(`/product/${p.id}`)}>
                    <div className="prod-img-wrap">
                      <img className="prod-img" src={p.img} alt={p.name} />
                      {p.badge && (
                        <span className="prod-badge" style={{ background: p.badgeColor }}>
                          {p.badge}
                        </span>
                      )}
                      <button
                        className="wish-btn"
                        onClick={(e) => toggleWishlist(p.id, e)}
                        aria-label="Wishlist"
                      >
                        {wishlist.includes(p.id) ? "❤️" : "🤍"}
                      </button>
                    </div>
                    <div className="prod-info">
                      <div className="prod-rating">
                        <Stars rating={p.rating} />
                        <span className="prod-reviews">
                          {p.rating} ({p.reviews} reviews)
                        </span>
                      </div>
                      <div className="prod-name">{p.name}</div>
                      <div className="prod-price">{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <div className="no-results-title">No products found</div>
                <div className="no-results-sub">Try a different search term or browse all products in Shop.</div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}