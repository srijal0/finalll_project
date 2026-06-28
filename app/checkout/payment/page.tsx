"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import CheckoutBreadcrumb from "../../components/checkout-breadcrumb";
import { useCart } from "../../context/cart-context";

type Method = "esewa" | "khalti" | "bank";

const DELIVERY_FEE = 180;

const METHODS: { id: Method; label: string; icon: string; isImage: boolean }[] = [
  { id: "esewa",  label: "eSewa",         icon: "/images/image20.png",  isImage: true  },
  { id: "khalti", label: "Khalti",        icon: "/images/image21.png", isImage: true  },
  { id: "bank",   label: "Bank Transfer", icon: "🏦",                 isImage: false },
];

export default function PaymentPage() {
  const router = useRouter();
  const { subtotal, itemCount } = useCart();
  const [selected, setSelected] = useState<Method>("esewa");

  const itemsTotal = Math.round(subtotal / 0.85);
  const discount = itemsTotal - subtotal;
  const shopTotal = subtotal;
  const total = shopTotal + DELIVERY_FEE;

  const handlePayment = () => {
    router.push("/order-confirmation");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }

        .payment-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 24px 80px;
        }
        .payment-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          align-items: start;
        }

        .payment-title {
          font-size: 24px;
          font-weight: 800;
          color: #1f3b22;
          margin-bottom: 20px;
        }

        .payment-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border: 1.5px solid #ececE4;
          border-radius: 12px;
          padding: 18px 20px;
          margin-bottom: 14px;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
        }
        .payment-option:hover { border-color: #c9d8cc; }
        .payment-option.selected {
          border-color: #1f3b22;
          background: #f7f9f5;
        }
        .payment-option-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .payment-radio {
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 2px solid #c9c6ba;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .payment-option.selected .payment-radio {
          border-color: #1f3b22;
        }
        .payment-radio-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #1f3b22;
        }
        .payment-option-label {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .payment-option-icon {
          width: 40px; height: 40px;
          border-radius: 8px;
          background: #f0efe9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          overflow: hidden;
        }
        .payment-option.selected .payment-option-icon {
          background: #e8f4ec;
        }

        .payment-note {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          background: #f3f6ef;
          border: 1px solid #dde6d4;
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 13px;
          color: #5b6b54;
          margin-top: 8px;
        }
        .payment-note svg { flex-shrink: 0; margin-top: 1px; }

        .payment-summary {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #ececE4;
          padding: 24px;
        }
        .payment-summary-title {
          font-size: 16px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 18px;
        }
        .payment-summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #555;
          margin-bottom: 12px;
        }
        .payment-summary-row.discount { color: #8a9a4f; }
        .payment-summary-row.bold { font-weight: 700; color: #1a1a1a; }
        .payment-summary-divider { height: 1px; background: #ececE4; margin: 14px 0; }
        .payment-summary-total {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 20px;
        }

        .payment-btn {
          width: 100%;
          padding: 16px;
          background: #1f3b22;
          color: #fff;
          border: none;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }
        .payment-btn:hover { background: #16291a; }

        .payment-secure {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #777;
          margin-top: 16px;
        }
        .payment-agree {
          text-align: center;
          font-size: 11px;
          color: #999;
          margin-top: 8px;
          line-height: 1.5;
        }

        @media (max-width: 800px) {
          .payment-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Header activePage="Shop" />

      <div className="payment-page">
        <CheckoutBreadcrumb step="payment" />

        <div className="payment-grid">
          <div>
            <h1 className="payment-title">Payment Method</h1>

            {METHODS.map((method) => (
              <div
                key={method.id}
                className={`payment-option ${selected === method.id ? "selected" : ""}`}
                onClick={() => setSelected(method.id)}
              >
                <div className="payment-option-left">
                  <span className="payment-radio">
                    {selected === method.id && <span className="payment-radio-dot" />}
                  </span>
                  <span className="payment-option-label">{method.label}</span>
                </div>

                {/* ✅ FIXED: shows image or emoji correctly */}
                <span className="payment-option-icon">
                  {method.isImage ? (
                    <img
                      src={method.icon}
                      alt={method.label}
                      style={{ width: "32px", height: "32px", objectFit: "contain" }}
                    />
                  ) : (
                    method.icon
                  )}
                </span>

              </div>
            ))}

            <div className="payment-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5b6b54" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="8" />
              </svg>
              <span>
                Your payment is secured with 256-bit encryption. We prioritize your privacy and data security.
              </span>
            </div>
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Order Summary</div>

            <div className="payment-summary-row">
              <span>Item(s) total</span>
              <span>Rs {itemsTotal}</span>
            </div>
            {discount > 0 && (
              <div className="payment-summary-row discount">
                <span>Shop discount</span>
                <span>-Rs {discount}</span>
              </div>
            )}

            <div className="payment-summary-divider" />

            <div className="payment-summary-row bold">
              <span>Shop Total</span>
              <span>Rs {shopTotal}</span>
            </div>
            <div className="payment-summary-row">
              <span>Delivery (To Nepal)</span>
              <span>Rs {DELIVERY_FEE}</span>
            </div>

            <div className="payment-summary-divider" />

            <div className="payment-summary-total">
              <span>Total ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
              <span>Rs {total}</span>
            </div>

            <button className="payment-btn" onClick={handlePayment}>
              Payment
            </button>

            <div className="payment-secure">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2">
                <path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z" />
              </svg>
              Secure Sustainable Checkout
            </div>
            <p className="payment-agree">
              By proceeding, you agree to EcoHaven&apos;s Transparency and Shipping policies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}