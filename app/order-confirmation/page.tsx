"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { useCart, CartItem } from "../context/cart-context";

const DELIVERY_FEE = 180;
const STORE_NAME = "EcoHaven";

interface OrderSnapshot {
  items: CartItem[];
  subtotal: number;
  total: number;
  orderNumber: number;
  date: Date;
}

export default function OrderConfirmationPage() {
  const router = useRouter();
  const cart = useCart();

  // Capture cart contents the moment this page mounts, before we clear it below.
  const [order] = useState<OrderSnapshot | null>(() => {
    if (cart.items.length === 0) return null;
    return {
      items: cart.items,
      subtotal: cart.subtotal,
      total: cart.subtotal + DELIVERY_FEE,
      orderNumber: Math.floor(10000 + Math.random() * 90000),
      date: new Date(),
    };
  });

  useEffect(() => {
    if (order) {
      try {
        localStorage.setItem("ecohaven_last_order", JSON.stringify(order));
      } catch {
        // ignore storage errors
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  useEffect(() => {
    cart.clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedDate = order?.date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }

        .oc-wrap {
          max-width: 700px;
          margin: 0 auto;
          padding: 60px 24px 80px;
          text-align: center;
        }
        .oc-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: #1f3b22;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        .oc-title {
          font-size: 26px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .oc-sub {
          font-size: 14px;
          color: #777;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .oc-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #ececE4;
          text-align: left;
          overflow: hidden;
        }
        .oc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .oc-grid-cell {
          padding: 18px 24px;
          border-bottom: 1px solid #ececE4;
        }
        .oc-grid-cell:nth-child(odd) { border-right: 1px solid #ececE4; }
        .oc-label {
          font-size: 11px;
          color: #999;
          margin-bottom: 4px;
        }
        .oc-value {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .oc-item-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 24px;
          border-bottom: 1px solid #ececE4;
        }
        .oc-item-img {
          width: 48px; height: 48px;
          border-radius: 8px;
          object-fit: cover;
          background: #f4f3ef;
          flex-shrink: 0;
        }
        .oc-item-name {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .oc-item-sub {
          font-size: 12px;
          color: #999;
        }
        .oc-item-price {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          margin-left: auto;
          flex-shrink: 0;
        }

        .oc-show-details {
          padding: 16px 24px 22px;
          display: flex;
          justify-content: center;
        }
        .oc-show-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1f3b22;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }
        .oc-show-btn:hover { background: #16291a; }

        .oc-continue {
          margin-top: 24px;
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          background: none;
          border: none;
          cursor: pointer;
        }
        .oc-continue:hover { color: #1f3b22; }

        .oc-empty { font-size: 14px; color: #777; }
      `}</style>

      <Header activePage="Shop" />

      <div className="oc-wrap">
        {!order ? (
          <>
            <p className="oc-empty">We couldn&apos;t find a recent order to confirm.</p>
            <button className="oc-continue" onClick={() => router.push("/shop")}>
              Continue Shopping
            </button>
          </>
        ) : (
          <>
            <div className="oc-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="4 12 9 17 20 6" />
              </svg>
            </div>
            <h1 className="oc-title">Your order is Confirmed</h1>
            <p className="oc-sub">
              {STORE_NAME} has accepted your order, and they are getting it ready.
            </p>

            <div className="oc-card">
              <div className="oc-grid">
                <div className="oc-grid-cell">
                  <div className="oc-label">Store</div>
                  <div className="oc-value">{STORE_NAME}</div>
                </div>
                <div className="oc-grid-cell">
                  <div className="oc-label">Order Number</div>
                  <div className="oc-value">Order {order.orderNumber}</div>
                </div>
                <div className="oc-grid-cell">
                  <div className="oc-label">Order total</div>
                  <div className="oc-value">Rs {order.total}</div>
                </div>
                <div className="oc-grid-cell">
                  <div className="oc-label">Order date</div>
                  <div className="oc-value">{formattedDate}</div>
                </div>
              </div>

              {order.items.map((item) => (
                <div className="oc-item-row" key={`${item.id}-${item.selectedType}-${item.selectedColor}`}>
                  <img className="oc-item-img" src={item.img} alt={item.name} />
                  <div>
                    <div className="oc-item-name">{item.name}</div>
                    {(item.selectedType || item.selectedColor) && (
                      <div className="oc-item-sub">
                        {[item.selectedType, item.selectedColor].filter(Boolean).join(" / ")}
                      </div>
                    )}
                  </div>
                  <div className="oc-item-price">Rs {item.priceValue * item.quantity}</div>
                </div>
              ))}

              <div className="oc-show-details">
                <button className="oc-show-btn" onClick={() => router.push("/track-order")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="16" y2="17" />
                  </svg>
                  Show details
                </button>
              </div>
            </div>

            <button className="oc-continue" onClick={() => router.push("/shop")}>
              Continue Shopping
            </button>
          </>
        )}
      </div>
    </>
  );
}