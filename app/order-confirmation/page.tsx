"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/header";
import { useCart } from "../context/cart-context";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }
        .oc-wrap {
          min-height: calc(100vh - 60px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }
        .oc-card {
          background: #fff;
          border-radius: 16px;
          padding: 48px 40px;
          text-align: center;
          max-width: 420px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }
        .oc-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: #e8f4ec;
          color: #2d4a2d;
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .oc-title { font-size: 20px; font-weight: 800; color: #1a1a1a; margin-bottom: 8px; }
        .oc-sub { font-size: 13px; color: #888; margin-bottom: 28px; line-height: 1.6; }
        .oc-note {
          background: #f7f6f1;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 12px;
          color: #999;
          margin-bottom: 24px;
        }
        .oc-btn {
          background: #1f3b22;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 13px 24px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
        }
        .oc-btn:hover { background: #16291a; }
      `}</style>

      <Header activePage="Shop" />

      <div className="oc-wrap">
        <div className="oc-card">
          <div className="oc-icon">✓</div>
          <div className="oc-title">Payment isn&apos;t set up yet</div>
          <p className="oc-sub">
            This is a placeholder confirmation page — no real payment was processed. Once a payment
            provider is connected, this is where the order confirmation would appear.
          </p>
          <div className="oc-note">Your cart has been cleared for this demo run.</div>
          <button className="oc-btn" onClick={() => router.push("/shop")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}