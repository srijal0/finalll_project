"use client";
import Header from "../components/header";
import { useCart } from "../context/cart-context";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  const shippingFee = 0;
  const environmentalTax = 0;
  const total = subtotal + shippingFee + environmentalTax;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }

        .cart-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 80px 80px;
        }
        .cart-title {
          font-size: 28px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .cart-sub {
          font-size: 13px;
          color: #888;
          margin-bottom: 28px;
        }

        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
          align-items: start;
        }

        .cart-items { display: flex; flex-direction: column; gap: 16px; }

        .cart-item-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #ececE4;
        }
        .cart-item-main {
          display: flex;
          gap: 18px;
          padding: 18px;
        }
        .cart-item-img {
          width: 110px;
          height: 110px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .cart-item-info { flex: 1; min-width: 0; }
        .cart-item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .cart-item-name {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .cart-item-rating {
          font-size: 12px;
          color: #888;
          margin-top: 4px;
        }
        .cart-item-rating .stars { color: #c8a84b; margin-right: 4px; }
        .cart-item-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #e8f4ec;
          color: #2d4a2d;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          margin-top: 8px;
        }
        .cart-price-block { text-align: right; flex-shrink: 0; }
        .cart-discount-tag {
          display: inline-block;
          background: #e8f4ec;
          color: #2d4a2d;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 4px;
        }
        .cart-old-price {
          font-size: 12px;
          color: #b3382c;
          text-decoration: line-through;
          margin-right: 4px;
        }
        .cart-new-price {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .cart-item-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
        }
        .cart-qty {
          display: inline-flex;
          align-items: center;
          border: 1px solid #e0ddd4;
          border-radius: 20px;
          overflow: hidden;
        }
        .cart-qty-btn {
          width: 28px; height: 28px;
          background: #fff;
          border: none;
          font-size: 14px;
          cursor: pointer;
          color: #444;
        }
        .cart-qty-btn:hover { background: #f0f7f2; color: #2d4a2d; }
        .cart-qty-val { width: 30px; text-align: center; font-size: 13px; font-weight: 600; }

        .cart-link-row { display: flex; gap: 16px; font-size: 12px; }
        .cart-link {
          color: #555;
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .cart-link:hover { color: #2d4a2d; }
        .cart-link.remove { color: #b3382c; }
        .cart-link.remove:hover { color: #8a2a20; }

        .cart-delivery-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f7f6f1;
          padding: 12px 18px;
          font-size: 12px;
          color: #555;
          border-top: 1px solid #ececE4;
        }
        .cart-delivery-bar strong { color: #1a1a1a; }

        .cart-add-more {
          border: 1.5px dashed #d8d5cb;
          border-radius: 12px;
          padding: 28px;
          text-align: center;
          color: #999;
          font-size: 13px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .cart-add-more:hover { border-color: #4a7c59; color: #2d4a2d; }
        .cart-add-more-icon { font-size: 22px; margin-bottom: 6px; }

        .cart-empty {
          text-align: center;
          padding: 80px 0;
        }
        .cart-empty-icon { font-size: 40px; margin-bottom: 14px; }
        .cart-empty-title { font-size: 17px; font-weight: 700; color: #1a1a1a; margin-bottom: 6px; }
        .cart-empty-sub { font-size: 13px; color: #999; margin-bottom: 20px; }
        .cart-empty-btn {
          background: #1f3b22;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }
        .cart-empty-btn:hover { background: #16291a; }

        /* Order summary */
        .order-summary {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #ececE4;
          padding: 22px;
        }
        .order-summary-title {
          font-size: 16px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 16px;
        }
        .order-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #555;
          margin-bottom: 10px;
        }
        .order-divider { height: 1px; background: #ececE4; margin: 14px 0; }
        .order-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 18px;
        }
        .checkout-btn {
          width: 100%;
          padding: 14px;
          background: #1f3b22;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .checkout-btn:hover { background: #16291a; }
        .order-trust {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
          color: #777;
        }
        .order-trust span { display: flex; align-items: center; gap: 6px; }

        @media (max-width: 900px) {
          .cart-page { padding: 24px 20px 60px; }
          .cart-grid { grid-template-columns: 1fr; }
          .cart-item-main { flex-direction: column; }
          .cart-item-img { width: 100%; height: 180px; }
          .cart-price-block { text-align: left; }
        }
      `}</style>

      <Header activePage="Shop" />

      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-sub">Check your items before proceeding to checkout.</p>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <div className="cart-empty-title">Your cart is empty</div>
            <div className="cart-empty-sub">Browse the shop to find something sustainable.</div>
            <button className="cart-empty-btn" onClick={() => router.push("/shop")}>
              Go to Shop
            </button>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-main">
                    <img className="cart-item-img" src={item.img} alt={item.name} />
                    <div className="cart-item-info">
                      <div className="cart-item-top">
                        <div>
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-rating">
                            <span className="stars">★</span>4.5 (19.4k reviews)
                          </div>
                          <span className="cart-item-badge">✓ Nice Product</span>
                        </div>
                        <div className="cart-price-block">
                          <span className="cart-discount-tag">15% Off</span>
                          <div>
                            <span className="cart-old-price">
                              Rs{Math.round(item.priceValue * 1.18)}
                            </span>
                          </div>
                          <div className="cart-new-price">Rs{item.priceValue * item.quantity}</div>
                        </div>
                      </div>

                      <div className="cart-item-actions">
                        <div className="cart-qty">
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="cart-qty-val">{item.quantity}</span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="cart-link-row">
                          <button className="cart-link" onClick={() => router.push(`/product/${item.id}`)}>
                            ✏️ Edit
                          </button>
                          <button className="cart-link">📑 Save for later</button>
                          <button className="cart-link remove" onClick={() => removeItem(item.id)}>
                            🗑️ Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cart-delivery-bar">
                    <span>
                      🚚 Delivery: <strong>Rs{item.priceValue >= 500 ? 0 : 50}</strong> • Get it by 18–22 May
                    </span>
                    <span>Standard Delivery</span>
                  </div>
                </div>
              ))}

              <div className="cart-add-more" onClick={() => router.push("/shop")}>
                <div className="cart-add-more-icon">🛒</div>
                Add more sustainable items to your cart
              </div>
            </div>

            <div className="order-summary">
              <div className="order-summary-title">Order Summary</div>

              <div className="order-row">
                <span>Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
                <span>Rs{subtotal}</span>
              </div>
              <div className="order-row">
                <span>Shipping fee</span>
                <span>Rs{shippingFee}</span>
              </div>
              <div className="order-row">
                <span>Environmental Tax</span>
                <span>Rs{environmentalTax}</span>
              </div>

              <div className="order-divider" />

              <div className="order-total-row">
                <span>Total</span>
                <span>Rs{total}</span>
              </div>

              <button className="checkout-btn">Check out →</button>

              <div className="order-trust">
                <span>🛡️ Secure Transaction</span>
                <span>♻️ Eco-friendly Packaging</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}