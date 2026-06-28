"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { productAPI } from "../lib/api";
import { useCart } from "../context/cart-context";

function Stars({ rating }: { rating: number }) {
  return <span style={{ color: "#c8a84b", fontSize: 12 }}>{"★".repeat(Math.floor(rating))}</span>;
}

export default function WishlistPage() {
  const router = useRouter();
  const { addItem } = useCart();

  // ✅ Load all products from MongoDB and use as wishlist
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [removed, setRemoved] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);

  useEffect(() => {
    // ✅ Fetch featured products to show in wishlist
    productAPI
      .getFeatured()
      .then((res) => setItems(res.products))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const remove = (id: string) => setRemoved((prev) => [...prev, id]);

  const handleAddToCart = (item: any) => {
    addItem({
      id: item._id,
      name: item.name,
      img: item.images?.[0] || "/images/image1.png",
      priceValue: item.price,
    });
    setAddedToCart((prev) => [...prev, item._id]);
  };

  const visibleItems = items.filter((i) => !removed.includes(i._id));

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f3ef", fontFamily: "'Segoe UI', sans-serif", color: "#888" }}>
        Loading wishlist...
      </div>
    );
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }
        .wl-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 80px; height: 60px; background: #fff; border-bottom: 1px solid #ebebeb; position: sticky; top: 0; z-index: 100; }
        .wl-logo { font-size: 20px; font-weight: 800; color: #2d4a2d; text-decoration: none; }
        .wl-logo span { color: #7aad6a; }
        .wl-nav-links { display: flex; gap: 28px; list-style: none; }
        .wl-nav-links a { font-size: 13px; font-weight: 500; color: #555; text-decoration: none; }
        .wl-nav-links a:hover { color: #2d4a2d; }
        .wl-back { display: flex; align-items: center; gap: 6px; background: none; border: none; cursor: pointer; font-size: 13px; color: #666; font-weight: 500; }
        .wl-back:hover { color: #2d4a2d; }
        .wl-page { max-width: 1100px; margin: 0 auto; padding: 48px 40px; }
        .wl-title { font-size: 28px; font-weight: 800; color: #1a1a1a; margin-bottom: 6px; }
        .wl-count { font-size: 13px; color: #999; margin-bottom: 36px; }
        .wl-empty { text-align: center; padding: 80px 20px; background: #fff; border-radius: 12px; }
        .wl-empty-icon { font-size: 52px; margin-bottom: 16px; }
        .wl-empty-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
        .wl-empty-sub { font-size: 13px; color: #aaa; margin-bottom: 24px; }
        .wl-empty-btn { background: #2d4a2d; color: #fff; border: none; padding: 11px 28px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .wl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .wl-card { background: #fff; border-radius: 12px; overflow: hidden; transition: box-shadow 0.2s; }
        .wl-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.09); }
        .wl-img-wrap { position: relative; overflow: hidden; }
        .wl-img { width: 100%; height: 200px; object-fit: cover; display: block; transition: transform 0.3s; cursor: pointer; }
        .wl-card:hover .wl-img { transform: scale(1.04); }
        .wl-badge { position: absolute; bottom: 10px; left: 10px; font-size: 9px; font-weight: 800; letter-spacing: 1px; padding: 3px 9px; border-radius: 3px; color: #fff; background: #4a7c59; }
        .wl-remove { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.95); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.12); transition: transform 0.15s; }
        .wl-remove:hover { transform: scale(1.1); }
        .wl-info { padding: 14px 16px 18px; }
        .wl-cat { font-size: 10px; font-weight: 700; letter-spacing: 1px; color: #aaa; text-transform: uppercase; margin-bottom: 4px; }
        .wl-name { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 5px; cursor: pointer; }
        .wl-name:hover { color: #2d4a2d; }
        .wl-rating { display: flex; align-items: center; gap: 5px; margin-bottom: 10px; }
        .wl-revs { font-size: 11px; color: #bbb; }
        .wl-bottom { display: flex; align-items: center; justify-content: space-between; }
        .wl-price { font-size: 16px; font-weight: 800; color: #2d4a2d; }
        .wl-cart-btn { background: #2d4a2d; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .wl-cart-btn:hover { background: #3a5e3a; }
        .wl-cart-btn.added { background: #7aad6a; cursor: default; }
        @media (max-width: 900px) {
          .wl-nav { padding: 0 20px; }
          .wl-nav-links { display: none; }
          .wl-page { padding: 32px 16px; }
          .wl-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <nav className="wl-nav">
        <a href="/" className="wl-logo">Eco<span>Haven</span></a>
        <ul className="wl-nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <button className="wl-back" onClick={() => router.push("/shop")}>
          ← Continue Shopping
        </button>
      </nav>

      <div className="wl-page">
        <h1 className="wl-title">My Wishlist 🤍</h1>
        <p className="wl-count">{visibleItems.length} {visibleItems.length === 1 ? "item" : "items"} saved</p>

        {visibleItems.length === 0 ? (
          <div className="wl-empty">
            <div className="wl-empty-icon">🤍</div>
            <h2 className="wl-empty-title">Your wishlist is empty</h2>
            <p className="wl-empty-sub">Save items you love and come back to them anytime.</p>
            <button className="wl-empty-btn" onClick={() => router.push("/shop")}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="wl-grid">
            {visibleItems.map((item) => (
              <div key={item._id} className="wl-card">
                <div className="wl-img-wrap">
                  <img
                    className="wl-img"
                    src={item.images?.[0] || "/images/image1.png"}
                    alt={item.name}
                    onClick={() => router.push(`/product/${item._id}`)}
                  />
                  {item.badge && <span className="wl-badge">{item.badge}</span>}
                  <button className="wl-remove" onClick={() => remove(item._id)} aria-label="Remove">✕</button>
                </div>
                <div className="wl-info">
                  <div className="wl-cat">{item.category}</div>
                  <div className="wl-name" onClick={() => router.push(`/product/${item._id}`)}>
                    {item.name}
                  </div>
                  <div className="wl-rating">
                    <Stars rating={item.rating || 0} />
                    <span className="wl-revs">({item.reviews || 0})</span>
                  </div>
                  <div className="wl-bottom">
                    <span className="wl-price">Rs{item.price}</span>
                    <button
                      className={`wl-cart-btn${addedToCart.includes(item._id) ? " added" : ""}`}
                      onClick={() => handleAddToCart(item)}
                      disabled={addedToCart.includes(item._id)}
                    >
                      {addedToCart.includes(item._id) ? "✓ Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}