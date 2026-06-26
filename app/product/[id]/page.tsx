"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../components/header";
import { getProductById } from "../../data/products";

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#c8a84b", fontSize: 15 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
    </span>
  );
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const product = getProductById(id);

  const [selectedType, setSelectedType] = useState(product?.types?.[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <Header activePage="Shop" />
        <div style={{ padding: "60px 80px", fontFamily: "'Segoe UI', sans-serif" }}>
          <p style={{ color: "#999", marginBottom: 16 }}>We couldn&apos;t find that product.</p>
          <button
            onClick={() => router.push("/shop")}
            style={{
              background: "#2d4a2d",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Back to Shop
          </button>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }

        .pd-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 80px 80px;
        }
        .pd-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #555;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 24px;
        }
        .pd-back:hover { color: #2d4a2d; }

        .pd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        .pd-img-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: #1c2b1c;
        }
        .pd-img {
          width: 100%;
          height: 460px;
          object-fit: cover;
          display: block;
        }
        .pd-wish {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          transition: transform 0.15s;
        }
        .pd-wish:hover { transform: scale(1.08); }

        .pd-name {
          font-size: 32px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 10px;
          line-height: 1.15;
        }
        .pd-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
          font-size: 13px;
          color: #888;
        }
        .pd-price {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .pd-tax-note {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
          margin-bottom: 18px;
        }
        .pd-ship-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e8f4ec;
          color: #2d4a2d;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 28px;
        }

        .pd-field { margin-bottom: 22px; }
        .pd-label {
          font-size: 12px;
          font-weight: 700;
          color: #555;
          margin-bottom: 8px;
        }
        .pd-select {
          width: 100%;
          max-width: 320px;
          padding: 11px 14px;
          font-size: 13px;
          border: 1px solid #e0ddd4;
          border-radius: 8px;
          background: #fff;
          color: #2d2d2d;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }

        .pd-qty {
          display: inline-flex;
          align-items: center;
          border: 1px solid #e0ddd4;
          border-radius: 8px;
          overflow: hidden;
        }
        .pd-qty-btn {
          width: 38px; height: 38px;
          background: #fff;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #444;
        }
        .pd-qty-btn:hover { background: #f0f7f2; color: #2d4a2d; }
        .pd-qty-val {
          width: 44px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
        }

        .pd-colors { display: flex; gap: 10px; }
        .pd-color-swatch {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          padding: 0;
          position: relative;
        }
        .pd-color-swatch.active {
          border-color: #2d4a2d;
          box-shadow: 0 0 0 2px #fff inset;
        }

        .pd-add-btn {
          width: 100%;
          max-width: 320px;
          padding: 15px;
          background: #1f3b22;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
        }
        .pd-add-btn:hover { background: #16291a; }
        .pd-add-btn.added { background: #4a7c59; }

        .pd-description {
          margin-top: 30px;
          font-size: 13px;
          line-height: 1.6;
          color: #666;
          max-width: 420px;
        }

        @media (max-width: 900px) {
          .pd-page { padding: 24px 20px 60px; }
          .pd-grid { grid-template-columns: 1fr; gap: 28px; }
          .pd-img { height: 320px; }
        }
      `}</style>

      <Header activePage="Shop" />

      <div className="pd-page">
        <button className="pd-back" onClick={() => router.back()}>
          ← back to search result
        </button>

        <div className="pd-grid">
          <div className="pd-img-wrap">
            <img className="pd-img" src={product.img} alt={product.name} />
            <button
              className="pd-wish"
              onClick={() => setWishlisted((w) => !w)}
              aria-label="Wishlist"
            >
              {wishlisted ? "❤️" : "🤍"}
            </button>
          </div>

          <div>
            <h1 className="pd-name">{product.name}</h1>
            <div className="pd-rating">
              <Stars rating={product.rating} />
              <span>({product.reviews} reviews)</span>
            </div>

            <div className="pd-price">{product.price}</div>
            <div className="pd-tax-note">Local taxes included</div>

            {product.shippingNote && (
              <div className="pd-ship-badge">⚡ {product.shippingNote}</div>
            )}

            {product.types && product.types.length > 0 && (
              <div className="pd-field">
                <div className="pd-label">Types</div>
                <select
                  className="pd-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {product.types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="pd-field">
              <div className="pd-label">Quantity</div>
              <div className="pd-qty">
                <button
                  className="pd-qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="pd-qty-val">{quantity}</span>
                <button
                  className="pd-qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="pd-field">
                <div className="pd-label">Color</div>
                <div className="pd-colors">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`pd-color-swatch${selectedColor === c ? " active" : ""}`}
                      style={{ background: c }}
                      onClick={() => setSelectedColor(c)}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <button className={`pd-add-btn${added ? " added" : ""}`} onClick={handleAddToCart}>
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>

            <p className="pd-description">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}