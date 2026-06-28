"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import Header from "../components/header";

const initialFavourites = [
  { id: 1, name: "Organic Cotton Tee", price: 300, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", category: "Clothing", rating: 4.9, reviews: 124 },
  { id: 2, name: "Modern Ceramic Vase", price: 250, img: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&q=80", category: "Home Goods", rating: 4.8, reviews: 210 },
  { id: 3, name: "Bamboo Brush", price: 300, img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80", category: "Accessories", rating: 4.7, reviews: 42 },
  { id: 4, name: "Beeswax Candle Set", price: 160, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80", category: "Home Goods", rating: 5.0, reviews: 91 },
];

const suggestions = [
  { id: 5, name: "Hemp Tote Bag", price: 190, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", category: "Accessories", rating: 4.6, reviews: 78 },
  { id: 6, name: "Linen Bedding Set", price: 350, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", category: "Bedding", rating: 5.0, reviews: 88 },
  { id: 7, name: "Rattan Basket", price: 420, img: "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=400&q=80", category: "Home Goods", rating: 4.9, reviews: 53 },
];

function Stars({ rating }: { rating: number }) {
  return <span style={{ color: "#c8a84b", fontSize: 12 }}>{"★".repeat(Math.floor(rating))}</span>;
}

export default function FavouritesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [favs, setFavs] = useState(initialFavourites);
  const [cart, setCart] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        if (!user) router.push("/login");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  const removeFav = (id: number) => setFavs(prev => prev.filter(f => f.id !== id));
  const addToCart = (id: number) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);
  const addFav = (item: typeof suggestions[0]) => {
    if (!favs.find(f => f.id === item.id)) setFavs(prev => [...prev, item]);
  };

  if (loading) {
    return (
      <>
        <Header activePage="Home" />
        <div style={{ minHeight: "100vh", background: "#f4f3ef", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "#2d4a2d", fontSize: 16, fontWeight: 600 }}>Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }
        .fv-page { max-width: 1100px; margin: 0 auto; padding: 48px 40px; }
        .fv-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 36px; }
        .fv-title { font-size: 28px; font-weight: 800; color: #1a1a1a; }
        .fv-count { font-size: 13px; color: #999; margin-top: 4px; }
        .fv-clear { background: none; border: 1px solid #e0e0e0; color: #999; padding: 8px 16px; border-radius: 6px; font-size: 12px; cursor: pointer; transition: all 0.15s; }
        .fv-clear:hover { border-color: #c0392b; color: #c0392b; }
        .fv-tabs { display: flex; gap: 0; border-bottom: 1px solid #e4e4e4; margin-bottom: 32px; }
        .fv-tab { background: none; border: none; padding: 9px 22px; font-size: 12px; font-weight: 700; letter-spacing: 1px; cursor: pointer; color: #aaa; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color 0.2s, border-color 0.2s; text-transform: uppercase; }
        .fv-tab.active { color: #2d4a2d; border-bottom-color: #2d4a2d; }
        .fv-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 56px; }
        .fv-card { background: #fff; border-radius: 12px; overflow: hidden; transition: box-shadow 0.2s; }
        .fv-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.09); }
        .fv-img-wrap { position: relative; overflow: hidden; }
        .fv-img { width: 100%; height: 170px; object-fit: cover; display: block; transition: transform 0.3s; }
        .fv-card:hover .fv-img { transform: scale(1.04); }
        .fv-heart { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.95); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.12); transition: transform 0.15s; }
        .fv-heart:hover { transform: scale(1.1); }
        .fv-info { padding: 12px 14px 16px; }
        .fv-cat { font-size: 10px; font-weight: 700; letter-spacing: 1px; color: #bbb; text-transform: uppercase; margin-bottom: 3px; }
        .fv-name { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
        .fv-rating { display: flex; align-items: center; gap: 5px; margin-bottom: 10px; }
        .fv-revs { font-size: 11px; color: #bbb; }
        .fv-row { display: flex; align-items: center; justify-content: space-between; }
        .fv-price { font-size: 14px; font-weight: 800; color: #2d4a2d; }
        .fv-add { background: #2d4a2d; color: #fff; border: none; padding: 7px 13px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .fv-add:hover { background: #3a5e3a; }
        .fv-add.added { background: #7aad6a; cursor: default; }
        .fv-empty { text-align: center; padding: 80px 20px; background: #fff; border-radius: 12px; }
        .fv-empty-icon { font-size: 52px; margin-bottom: 16px; }
        .fv-empty-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
        .fv-empty-sub { font-size: 13px; color: #aaa; margin-bottom: 24px; }
        .fv-empty-btn { background: #2d4a2d; color: #fff; border: none; padding: 11px 28px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .fv-suggest-title { font-size: 18px; font-weight: 800; color: #1a1a1a; margin-bottom: 20px; }
        .fv-suggest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .fv-scard { background: #fff; border-radius: 12px; overflow: hidden; display: flex; gap: 14px; padding: 14px; align-items: center; transition: box-shadow 0.2s; cursor: pointer; }
        .fv-scard:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .fv-simg { width: 70px; height: 70px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
        .fv-sinfo { flex: 1; min-width: 0; }
        .fv-sname { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .fv-sprice { font-size: 13px; font-weight: 700; color: #2d4a2d; margin-bottom: 8px; }
        .fv-sfav { background: none; border: 1px solid #e0e0e0; color: #666; padding: 5px 12px; border-radius: 5px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .fv-sfav:hover { border-color: #2d4a2d; color: #2d4a2d; }
        .fv-sfav.saved { border-color: #7aad6a; color: #4a7c59; background: #f0f7f2; cursor: default; }
        @media (max-width: 900px) {
          .fv-page { padding: 32px 16px; }
          .fv-grid { grid-template-columns: repeat(2, 1fr); }
          .fv-suggest-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Header activePage="Home" />

      <div className="fv-page">
        <div className="fv-top">
          <div>
            <h1 className="fv-title">My Favourites ❤️</h1>
            <p className="fv-count">{favs.length} {favs.length === 1 ? "item" : "items"}</p>
          </div>
          {favs.length > 0 && (
            <button className="fv-clear" onClick={() => setFavs([])}>Clear All</button>
          )}
        </div>

        <div className="fv-tabs">
          <button className="fv-tab active">All Favourites</button>
          <button className="fv-tab">Clothing</button>
          <button className="fv-tab">Home Goods</button>
          <button className="fv-tab">Accessories</button>
        </div>

        {favs.length === 0 ? (
          <div className="fv-empty">
            <div className="fv-empty-icon">❤️</div>
            <h2 className="fv-empty-title">No favourites yet</h2>
            <p className="fv-empty-sub">Tap the heart on any product to save it here.</p>
            <button className="fv-empty-btn" onClick={() => router.push("/shop")}>Discover Products</button>
          </div>
        ) : (
          <div className="fv-grid">
            {favs.map(item => (
              <div key={item.id} className="fv-card">
                <div className="fv-img-wrap">
                  <img className="fv-img" src={item.img} alt={item.name} />
                  <button className="fv-heart" onClick={() => removeFav(item.id)} aria-label="Remove favourite">❤️</button>
                </div>
                <div className="fv-info">
                  <div className="fv-cat">{item.category}</div>
                  <div className="fv-name">{item.name}</div>
                  <div className="fv-rating">
                    <Stars rating={item.rating} />
                    <span className="fv-revs">({item.reviews})</span>
                  </div>
                  <div className="fv-row">
                    <span className="fv-price">Rs{item.price}</span>
                    <button
                      className={`fv-add${cart.includes(item.id) ? " added" : ""}`}
                      onClick={() => addToCart(item.id)}
                      disabled={cart.includes(item.id)}
                    >
                      {cart.includes(item.id) ? "✓ Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="fv-suggest-title">You might also like</h2>
        <div className="fv-suggest-grid">
          {suggestions.map(s => {
            const isSaved = !!favs.find(f => f.id === s.id);
            return (
              <div key={s.id} className="fv-scard">
                <img className="fv-simg" src={s.img} alt={s.name} />
                <div className="fv-sinfo">
                  <div className="fv-sname">{s.name}</div>
                  <div className="fv-sprice">Rs{s.price}</div>
                  <button
                    className={`fv-sfav${isSaved ? " saved" : ""}`}
                    onClick={() => addFav(s)}
                    disabled={isSaved}
                  >
                    {isSaved ? "❤️ Saved" : "🤍 Save"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}