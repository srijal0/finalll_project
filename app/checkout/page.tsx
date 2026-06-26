"use client";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import CheckoutBreadcrumb from "../components/checkout-breadcrumb";
import { useCart } from "../context/cart-context";
import { useAddress } from "../context/address-context";

const DELIVERY_FEE = 180;

function getDeliveryWindow() {
  const start = new Date();
  start.setDate(start.getDate() + 5);
  const end = new Date();
  end.setDate(end.getDate() + 7);
  const startDay = start.getDate();
  const endDay = end.getDate();
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  if (start.getMonth() !== end.getMonth()) {
    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }
  return `${startDay}-${endDay} ${endMonth}`;
}

function maskPhone(phone: string) {
  if (phone.length <= 4) return phone;
  return `${phone.slice(0, 4)}${"*".repeat(phone.length - 4)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount } = useCart();
  const { address } = useAddress();

  const total = subtotal + DELIVERY_FEE;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }

        .checkout-page {
          max-width: 700px;
          margin: 0 auto;
          padding: 32px 24px 80px;
        }
        .checkout-section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .checkout-section-title h2 {
          font-size: 15px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0;
        }
        .checkout-edit-link {
          font-size: 12px;
          color: #555;
          text-decoration: underline;
          background: none;
          border: none;
          cursor: pointer;
        }
        .checkout-edit-link:hover { color: #1f3b22; }

        .checkout-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #ececE4;
          padding: 18px;
          margin-bottom: 24px;
        }

        .checkout-address-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .checkout-address-name {
          font-weight: 700;
          color: #1a1a1a;
          font-size: 14px;
        }
        .checkout-address-phone {
          font-size: 12px;
          color: #888;
          margin-left: 8px;
        }
        .checkout-address-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }
        .checkout-address-label {
          font-size: 10px;
          font-weight: 700;
          background: #1a1a1a;
          color: #fff;
          padding: 2px 8px;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }
        .checkout-address-line { font-size: 13px; color: #555; }

        .checkout-eyebrow {
          font-size: 11px;
          font-weight: 700;
          color: #999;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .checkout-delivery-title {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 14px;
        }
        .checkout-delivery-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1.5px solid #1f3b22;
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 16px;
        }
        .checkout-radio {
          width: 16px; height: 16px;
          border-radius: 50%;
          border: 2px solid #1f3b22;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .checkout-radio-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #1f3b22;
        }
        .checkout-delivery-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .checkout-delivery-fee {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .checkout-delivery-type {
          font-size: 12px;
          color: #777;
        }
        .checkout-delivery-eta {
          font-size: 12px;
          color: #777;
        }

        .checkout-item-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-top: 1px solid #f0efe9;
        }
        .checkout-item-row:first-child { border-top: none; }
        .checkout-item-img {
          width: 56px; height: 56px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
          background: #f4f3ef;
        }
        .checkout-item-name {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .checkout-item-prices { display: flex; align-items: baseline; gap: 6px; margin-top: 2px; }
        .checkout-item-old-price {
          font-size: 11px;
          color: #b3382c;
          text-decoration: line-through;
        }
        .checkout-item-new-price {
          font-size: 13px;
          color: #1a1a1a;
          font-weight: 600;
        }
        .checkout-item-qty {
          font-size: 12px;
          color: #777;
          flex-shrink: 0;
        }

        .checkout-order-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #555;
          margin-bottom: 10px;
        }
        .checkout-order-divider { height: 1px; background: #ececE4; margin: 12px 0; }
        .checkout-order-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 800;
          color: #1a1a1a;
        }

        .checkout-pay-btn {
          width: 100%;
          padding: 15px;
          background: #1f3b22;
          color: #fff;
          border: none;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }
        .checkout-pay-btn:hover { background: #16291a; }

        .checkout-empty {
          text-align: center;
          padding: 80px 0;
        }
        .checkout-empty-btn {
          background: #1f3b22;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 16px;
        }
        .checkout-empty-btn:hover { background: #16291a; }
      `}</style>

      <Header activePage="Shop" />

      <div className="checkout-page">
        <CheckoutBreadcrumb step="shipping" />

        {items.length === 0 ? (
          <div className="checkout-empty">
            <p>Your cart is empty.</p>
            <button className="checkout-empty-btn" onClick={() => router.push("/shop")}>
              Go to Shop
            </button>
          </div>
        ) : (
          <>
            <div className="checkout-section-title">
              <h2>Shipping Address</h2>
            </div>
            <div className="checkout-card">
              <div className="checkout-address-row">
                <div>
                  <span className="checkout-address-name">{address.name || "Add your name"}</span>
                  <span className="checkout-address-phone">{maskPhone(address.phone)}</span>
                  <div className="checkout-address-tags">
                    <span className="checkout-address-label">{address.label}</span>
                    <span className="checkout-address-line">{address.line}</span>
                  </div>
                </div>
                <button className="checkout-edit-link" onClick={() => router.push("/cart")}>
                  Edit
                </button>
              </div>
            </div>

            <p className="checkout-eyebrow">PACKAGE 1 OF 1</p>
            <div className="checkout-card">
              <h3 className="checkout-delivery-title">Delivery or Pickup</h3>
              <div className="checkout-delivery-option">
                <div className="checkout-delivery-left">
                  <span className="checkout-radio">
                    <span className="checkout-radio-dot" />
                  </span>
                  <div>
                    <div className="checkout-delivery-fee">Rs {DELIVERY_FEE}</div>
                    <div className="checkout-delivery-type">Standard Delivery</div>
                  </div>
                </div>
                <span className="checkout-delivery-eta">Get by {getDeliveryWindow()}</span>
              </div>

              {items.map((item) => (
                <div className="checkout-item-row" key={`${item.id}-${item.selectedType}-${item.selectedColor}`}>
                  <img className="checkout-item-img" src={item.img} alt={item.name} />
                  <div style={{ flex: 1 }}>
                    <div className="checkout-item-name">{item.name}</div>
                    <div className="checkout-item-prices">
                      <span className="checkout-item-old-price">
                        Rs {Math.round(item.priceValue * 1.18)}
                      </span>
                      <span className="checkout-item-new-price">Rs {item.priceValue}</span>
                    </div>
                  </div>
                  <span className="checkout-item-qty">Qty: {item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="checkout-section-title">
              <h2>Invoice and Contact Info</h2>
              <button className="checkout-edit-link" onClick={() => router.push("/cart")}>
                Edit
              </button>
            </div>
            <div className="checkout-card">
              <p className="checkout-eyebrow">ORDER DETAIL</p>
              <div className="checkout-order-row">
                <span>Item Total ({itemCount} {itemCount === 1 ? "Item" : "Items"})</span>
                <span>Rs {subtotal}</span>
              </div>
              <div className="checkout-order-row">
                <span>Delivery fee</span>
                <span>Rs {DELIVERY_FEE}</span>
              </div>
              <div className="checkout-order-divider" />
              <div className="checkout-order-total-row">
                <span>Total</span>
                <span>Rs {total}</span>
              </div>
            </div>

            <button className="checkout-pay-btn" onClick={() => router.push("/checkout/payment")}>
              Proceed to Pay
            </button>
          </>
        )}
      </div>
    </>
  );
}