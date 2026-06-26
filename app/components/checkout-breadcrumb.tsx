"use client";
import { useRouter } from "next/navigation";

type Step = "shipping" | "payment";

export default function CheckoutBreadcrumb({ step }: { step: Step }) {
  const router = useRouter();

  return (
    <>
      <style>{`
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #888;
          margin-bottom: 20px;
        }
        .breadcrumb button {
          background: none;
          border: none;
          color: #888;
          font-size: 13px;
          cursor: pointer;
          padding: 0;
        }
        .breadcrumb button:hover { color: #1f3b22; }
        .breadcrumb .current {
          color: #1a1a1a;
          font-weight: 700;
        }
        .breadcrumb .sep { color: #ccc; }
      `}</style>
      <div className="breadcrumb">
        <button onClick={() => router.push("/cart")}>Cart</button>
        <span className="sep">›</span>
        {step === "shipping" ? (
          <span className="current">Shipping</span>
        ) : (
          <button onClick={() => router.push("/checkout")}>Shipping</button>
        )}
        <span className="sep">›</span>
        {step === "payment" ? (
          <span className="current">Payment</span>
        ) : (
          <span>Payment</span>
        )}
      </div>
    </>
  );
}