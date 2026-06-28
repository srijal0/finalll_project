"use client";
import { useState } from "react";

type Tab = "ALL" | "NEW ARRIVALS" | "BEST SELLER" | "TOP RATED";

const allProducts = [
  {
    name: "Organic Cotton Tee",
    price: "Rs300",
    rating: 4,
    reviews: 5,
    img: "/images/image10.png",
    tag: "",
    tabs: ["ALL", "BEST SELLER"] as Tab[],
  },
  {
    name: "Linen Bedding Set",
    price: "Rs350",
    rating: 4,
    reviews: 3,
    img: "/images/image11.png",
    tag: "",
    dot: true,
    tabs: ["ALL", "NEW ARRIVALS", "BEST SELLER"] as Tab[],
  },
  {
    name: "Bamboo Brush",
    price: "Rs300",
    rating: 5,
    reviews: 7,
    img: "/images/image12.png",
    tag: "New",
    tabs: ["ALL", "NEW ARRIVALS", "TOP RATED"] as Tab[],
  },
  {
    name: "Modern Vase",
    price: "Rs250",
    rating: 4,
    reviews: 4,
    img: "/images/image13.png",
    tag: "",
    tabs: ["ALL", "TOP RATED"] as Tab[],
  },
  {
    name: "Rattan Basket",
    price: "Rs420",
    rating: 5,
    reviews: 9,
    img: "/images/image14.png",
    tag: "New",
    tabs: ["ALL", "NEW ARRIVALS", "TOP RATED"] as Tab[],
  },
  {
    name: "Ceramic Mug Set",
    price: "Rs280",
    rating: 4,
    reviews: 6,
    img: "/images/image15.png",
    tag: "",
    tabs: ["ALL", "BEST SELLER"] as Tab[],
  },
  {
    name: "Hemp Tote Bag",
    price: "Rs190",
    rating: 5,
    reviews: 12,
    img: "/images/image16.png",
    tag: "",
    tabs: ["ALL", "BEST SELLER", "TOP RATED"] as Tab[],
  },
  {
    name: "Beeswax Candle",
    price: "Rs160",
    rating: 5,
    reviews: 8,
    img: "/images/image17.png",
    tag: "New",
    tabs: ["ALL", "NEW ARRIVALS"] as Tab[],
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= rating ? "#c8a84b" : "#ddd", fontSize: 12 }}>★</span>
      ))}
    </span>
  );
}

export default function Products() {
  const [tab, setTab] = useState<Tab>("ALL");
  const [showAll, setShowAll] = useState(false);
  const tabs: Tab[] = ["ALL", "NEW ARRIVALS", "BEST SELLER", "TOP RATED"];

  const filtered = allProducts.filter(p => p.tabs.includes(tab));
  const visible = showAll ? filtered : filtered.slice(0, 4);

  return (
    <>
      <style>{`
        .products {
          padding: 60px 80px;
          background: #fafaf8;
        }
        .products-heading {
          text-align: center;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #1a1a1a;
          margin-bottom: 18px;
        }
        .products-tabs {
          display: flex;
          justify-content: center;
          border-bottom: 1px solid #e4e4e4;
          margin-bottom: 36px;
          gap: 0;
        }
        .ptab {
          background: none;
          border: none;
          padding: 9px 22px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          cursor: pointer;
          color: #aaa;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: color 0.2s, border-color 0.2s;
          text-transform: uppercase;
        }
        .ptab.active {
          color: #2d4a2d;
          border-bottom-color: #2d4a2d;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }
        .prod-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .prod-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.09); }
        .prod-img-wrap { position: relative; }
        .prod-img {
          width: 100%;
          height: 190px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        .prod-card:hover .prod-img { transform: scale(1.03); }
        .prod-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #4a7c59;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 3px;
          letter-spacing: 0.5px;
        }
        .prod-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 10px; height: 10px;
          background: #e05252;
          border-radius: 50%;
        }
        .prod-info { padding: 12px 14px 16px; }
        .prod-name {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 5px;
        }
        .prod-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 7px;
        }
        .prod-reviews { font-size: 11px; color: #aaa; }
        .prod-price {
          font-size: 14px;
          font-weight: 700;
          color: #2d4a2d;
        }
        .products-more {
          display: flex;
          justify-content: center;
        }
        .btn-more {
          border: 1.5px solid #2d4a2d;
          background: none;
          color: #2d4a2d;
          padding: 11px 36px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          text-transform: uppercase;
        }
        .btn-more:hover {
          background: #2d4a2d;
          color: #fff;
        }

        @media (max-width: 900px) {
          .products { padding: 40px 24px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .ptab { padding: 8px 12px; font-size: 10px; }
        }
      `}</style>

      <section className="products">
        <h2 className="products-heading">Our Trendy Products</h2>
        <div className="products-tabs">
          {tabs.map(t => (
            <button
              key={t}
              className={`ptab${tab === t ? " active" : ""}`}
              onClick={() => { setTab(t); setShowAll(false); }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {visible.map((p, i) => (
            <div key={i} className="prod-card">
              <div className="prod-img-wrap">
                <img className="prod-img" src={p.img} alt={p.name} />
                {p.tag && <span className="prod-badge">{p.tag}</span>}
                {(p as any).dot && <span className="prod-dot" />}
              </div>
              <div className="prod-info">
                <div className="prod-name">{p.name}</div>
                <div className="prod-meta">
                  <Stars rating={p.rating} />
                  <span className="prod-reviews">({p.reviews})</span>
                </div>
                <div className="prod-price">{p.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="products-more">
          <button
            className="btn-more"
            onClick={() => setShowAll(v => !v)}
          >
            {showAll ? "Show Less" : "View More Products"}
          </button>
        </div>
      </section>
    </>
  );
}