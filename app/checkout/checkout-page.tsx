"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { useCart } from "../context/cart-context";
import { useAuth } from "../context/auth-context";
import { useAddress } from "../context/address-context";

function maskPhone(phone: string) {
  if (phone.length <= 4) return phone;
  return phone.slice(0, 4) + "*".repeat(Math.max(phone.length - 4, 0));
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount } = useCart();
  const { user } = useAuth();
  const { address, updateAddress } = useAddress();

  const [editing, setEditing] = useState(false);
  const [formName, setFormName] = useState(address.name || user?.name || "");
  const [formPhone, setFormPhone] = useState(address.phone);
  const [formLabel, setFormLabel] = useState(address.label);
  const [formLine, setFormLine] = useState(address.line);

  const deliveryFee = 180;
  const total = subtotal + deliveryFee;

  const displayName = address.name || user?.name || "Guest";

  const saveAddress = () => {
    updateAddress({ name: formName, phone: formPhone, label: formLabel, line: formLine });
    setEditing(false);
  };

  if (items.length === 0) {
    return (
      <>
        <Header activePage="Shop" />
        <div style={{ padding: "60px 80px", fontFamily: "'Segoe UI', sans-serif", textAlign: "center" }}>
          <p style={{ color: "#999", marginBottom: 16 }}>Your cart is empty, so there&apos;s nothing to check out.</p>
          <button
            onClick={() => router.push("/shop")}
            style={{
              background: "#1f3b22",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px 24px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Go to Shop
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }

        .co-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 32px 24px 80px;
        }
        .co-section-title {
          font-size: 17px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 14px;
        }

        .co-address-card {
          background: #fff;
          border: 1px solid #ececE4;
          border-radius: 12px;
          padding: 18px 20px;
          margin-bottom: 28px;
          position: relative;
        }
        .co-address-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 6px;
        }
        .co-address-name { font-size: 14px; font-weight: 700; color: #1a1a1a; }
        .co-address-phone { font-size: 12px; color: #999; margin-left: 8px; }
        .co-edit-link {
          background: none;
          border: none;
          color: #2d4a2d;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }
        .co-address-bottom {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #555;
        }
        .co-label-tag {
          background: #2d4a2d;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .co-edit-form { display: flex; flex-direction: column; gap: 10px; }
        .co-edit-row { display: flex; gap: 10px; }
        .co-edit-input {
          flex: 1;
          padding: 9px 12px;
          font-size: 13px;
          border: 1px solid #e0ddd4;
          border-radius: 7px;
          outline: none;
        }
        .co-edit-input:focus { border-color: #4a7c59; }
        .co-edit-actions { display: flex; gap: 10px; margin-top: 4px; }
        .co-save-btn, .co-cancel-btn {
          padding: 8px 16px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          border: none;
        }
        .co-save-btn { background: #1f3b22; color: #fff; }
        .co-save-btn:hover { background: #16291a; }
        .co-cancel-btn { background: #f0efe9; color: #555; }
        .co-cancel-btn:hover { background: #e6e4dc; }

        .co-package-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #999;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .co-package-card {
          background: #fff;
          border: 1px solid #ececE4;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 28px;
        }
        .co-delivery-title { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
        .co-delivery-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1.5px solid #2d4a2d;
          background: #f3f8f4;
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 16px;
        }
        .co-delivery-left { display: flex; align-items: center; gap: 12px; }
        .co-radio-dot {
          width: 16px; height: 16px;
          border-radius: 50%;
          border: 2px solid #2d4a2d;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .co-radio-dot::after {
          content: "";
          width: 8px; height: 8px;
          background: #2d4a2d;
          border-radius: 50%;
        }
        .co-delivery-price { font-size: 13px; font-weight: 700; color: #1a1a1a; }
        .co-delivery-sub { font-size: 11px; color: #888; }
        .co-delivery-eta { font-size: 12px; color: #555; }

        .co-item-row {
          display: flex;
          gap: 14px;
          border-top: 1px solid #ececE4;
          padding-top: 16px;
        }
        .co-item-img { width: 56px; height: 56px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
        .co-item-name { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
        .co-item-price-row { font-size: 12px; color: #555; }
        .co-item-old-price { text-decoration: line-through; color: #aaa; margin-right: 6px; }
        .co-item-new-price { font-weight: 700; color: #1a1a1a; }
        .co-item-qty { font-size: 12px; color: #888; margin-top: 2px; }

        .co-invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .co-invoice-card {
          background: #f7f6f1;
          border-radius: 12px;
          padding: 18px 20px;
          margin-bottom: 28px;
        }
        .co-invoice-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #999;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .co-invoice-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #555;
          margin-bottom: 8px;
        }
        .co-invoice-divider { height: 1px; background: #e0ddd2; margin: 12px 0; }
        .co-invoice-total {
          display: flex;
          justify-content: space-between;
          font-size: 17px;
          font-weight: 800;
          color: #1a1a1a;
        }

        .co-pay-btn {
          display: block;
          width: 100%;
          max-width: 340px;
          margin: 0 auto;
          padding: 15px;
          background: #1f3b22;
          color: #fff;
          border: none;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
        }
        .co-pay-btn:hover { background: #16291a; }

        @media (max-width: 600px) {
          .co-page { padding: 24px 16px 60px; }
          .co-edit-row { flex-direction: column; }
        }
      `}</style>

      <Header activePage="Shop" />

      <div className="co-page">
        <h2 className="co-section-title">Shipping Address</h2>

        <div className="co-address-card">
          {!editing ? (
            <>
              <div className="co-address-top">
                <div>
                  <span className="co-address-name">{displayName}</span>
                  <span className="co-address-phone">{maskPhone(address.phone)}</span>
                </div>
                <button className="co-edit-link" onClick={() => setEditing(true)}>
                  Edit
                </button>
              </div>
              <div className="co-address-bottom">
                <span className="co-label-tag">{address.label}</span>
                <span>{address.line}</span>
              </div>
            </>
          ) : (
            <div className="co-edit-form">
              <div className="co-edit-row">
                <input
                  className="co-edit-input"
                  placeholder="Full name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
                <input
                  className="co-edit-input"
                  placeholder="Phone number"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                />
              </div>
              <div className="co-edit-row">
                <input
                  className="co-edit-input"
                  placeholder="Label (e.g. HOME, OFFICE)"
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value.toUpperCase())}
                  style={{ maxWidth: 140 }}
                />
                <input
                  className="co-edit-input"
                  placeholder="Address line"
                  value={formLine}
                  onChange={(e) => setFormLine(e.target.value)}
                />
              </div>
              <div className="co-edit-actions">
                <button className="co-save-btn" onClick={saveAddress}>Save</button>
                <button className="co-cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        <p className="co-package-label">Package 1 of 1</p>

        <div className="co-package-card">
          <div className="co-delivery-title">Delivery or Pickup</div>

          <div className="co-delivery-option">
            <div className="co-delivery-left">
              <span className="co-radio-dot" />
              <div>
                <div className="co-delivery-price">Rs {deliveryFee}</div>
                <div className="co-delivery-sub">Standard Delivery</div>
              </div>
            </div>
            <div className="co-delivery-eta">Get by 17–18 May</div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="co-item-row">
              <img className="co-item-img" src={item.img} alt={item.name} />
              <div>
                <div className="co-item-name">{item.name}</div>
                <div className="co-item-price-row">
                  <span className="co-item-old-price">Rs{Math.round(item.priceValue * 1.18)}</span>
                  <span className="co-item-new-price">Rs {item.priceValue}</span>
                </div>
                <div className="co-item-qty">Qty: {item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="co-invoice-header">
          <h2 className="co-section-title" style={{ marginBottom: 0 }}>Invoice and Contact Info</h2>
          <button className="co-edit-link">Edit</button>
        </div>

        <div className="co-invoice-card">
          <p className="co-invoice-label">Order Detail</p>
          <div className="co-invoice-row">
            <span>Item Total ({itemCount} Item{itemCount !== 1 ? "s" : ""})</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="co-invoice-row">
            <span>Delivery fee</span>
            <span>Rs {deliveryFee}</span>
          </div>

          <div className="co-invoice-divider" />

          <div className="co-invoice-total">
            <span>Total</span>
            <span>Rs {total}</span>
          </div>
        </div>

        <button
          className="co-pay-btn"
          onClick={() => router.push("/order-confirmation")}
        >
          Proceed to Pay
        </button>
      </div>
    </>
  );
}