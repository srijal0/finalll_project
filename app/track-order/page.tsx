"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddress } from "../context/address-context";
import { CartItem } from "../context/cart-context";

interface StoredOrder {
  items: CartItem[];
  subtotal: number;
  total: number;
  orderNumber: number;
  date: string;
}

function getDeliveryWindow() {
  const start = new Date();
  start.setDate(start.getDate() + 5);
  const end = new Date();
  end.setDate(end.getDate() + 7);
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  return `${fmt(start)} / ${fmt(end)}`;
}

const TIMELINE = [
  { label: "Delivered", done: false, current: false, showBar: false },
  { label: "Out For Delivery", done: false, current: false, showBar: true },
  { label: "In Transit", done: false, current: false, showBar: true },
  { label: "Ready to Ship", done: false, current: false, showBar: true },
  { label: "Packed", done: true, current: true, showBar: true },
  { label: "Seller to Packed", done: true, current: false, showBar: true },
];

export default function TrackOrderPage() {
  const router = useRouter();
  const { address } = useAddress();

  const [order] = useState<StoredOrder | null>(() => {
    try {
      const raw = localStorage.getItem("ecohaven_last_order");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const firstItem = order?.items?.[0];
  const areaName = address.line?.split(",").pop()?.trim() || address.line;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f3ef; color: #2d2d2d; }

        .track-header {
          background: #f4f3ef;
          border-bottom: 1px solid #ececE4;
          padding: 18px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .track-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .track-back-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #1a1a1a;
          display: flex;
        }
        .track-header-title {
          font-size: 18px;
          font-weight: 800;
          color: #1a1a1a;
        }
        .track-header-nav {
          display: flex;
          align-items: center;
          gap: 28px;
          font-size: 13px;
          color: #444;
        }
        .track-header-nav button {
          background: none;
          border: none;
          font-size: 13px;
          color: #444;
          cursor: pointer;
        }
        .track-header-nav button:hover { color: #1f3b22; }
        .track-header-icons { display: flex; align-items: center; gap: 16px; }

        .track-page {
          max-width: 600px;
          margin: 0 auto;
          padding: 32px 24px 80px;
        }

        .track-status-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #ececE4;
          display: flex;
          gap: 20px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .track-status-img {
          width: 168px;
          height: 168px;
          border-radius: 12px;
          object-fit: cover;
          flex-shrink: 0;
          background: #2f4a3a;
        }
        .track-status-body { flex: 1; padding-top: 4px; }
        .track-status-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .track-status-eyebrow {
          font-size: 11px;
          font-weight: 700;
          color: #999;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .track-status-title {
          font-size: 22px;
          font-weight: 800;
          color: #1a1a1a;
        }
        .track-status-badge {
          background: #eef3da;
          color: #5c6b2f;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 999px;
          white-space: nowrap;
        }
        .track-status-eta {
          font-size: 13px;
          color: #555;
          margin: 14px 0;
        }
        .track-status-divider {
          height: 1px;
          background: #ececE4;
          margin: 14px 0;
        }
        .track-status-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
        }
        .track-status-row:last-child { margin-bottom: 0; }
        .track-status-row svg { margin-top: 2px; flex-shrink: 0; color: #555; }
        .track-status-row-label {
          font-size: 11px;
          color: #999;
        }
        .track-status-row-value {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .track-timeline-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #ececE4;
          padding: 24px;
        }
        .track-timeline-title {
          font-size: 18px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 20px;
        }
        .track-timeline-item {
          display: flex;
          gap: 14px;
          padding-bottom: 24px;
        }
        .track-timeline-item:last-child { padding-bottom: 0; }
        .track-timeline-dot-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .track-timeline-dot {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #e9e8e2;
          flex-shrink: 0;
        }
        .track-timeline-dot.done {
          background: #1f3b22;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .track-timeline-label {
          font-size: 14px;
          font-weight: 600;
          color: #999;
        }
        .track-timeline-label.done { color: #1a1a1a; font-weight: 700; }
        .track-timeline-sub {
          font-size: 12px;
          color: #aaa;
          margin-top: 2px;
        }
        .track-timeline-bars {
          display: flex;
          gap: 6px;
          margin-top: 8px;
        }
        .track-timeline-bar {
          height: 5px;
          border-radius: 3px;
          background: #e9e8e2;
        }
        .track-timeline-bar.filled { background: #c7c4b7; }

        .track-empty {
          text-align: center;
          padding: 80px 0;
          font-size: 14px;
          color: #777;
        }
      `}</style>

      <header className="track-header">
        <div className="track-header-left">
          <button className="track-back-btn" onClick={() => router.back()} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <span className="track-header-title">Track Order</span>
        </div>
        <div className="track-header-nav">
          <button onClick={() => router.push("/shop")}>Shop</button>
          <button onClick={() => router.push("/about")}>About</button>
          <button onClick={() => router.push("/blog")}>Blog</button>
        </div>
        <div className="track-header-icons">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
            <path d="M16 11V7a4 4 0 10-8 0v4M5 9h14l1 11H4L5 9z" />
          </svg>
        </div>
      </header>

      <div className="track-page">
        {!order ? (
          <div className="track-empty">No recent order found to track.</div>
        ) : (
          <>
            <div className="track-status-card">
              <img
                className="track-status-img"
                src={firstItem?.img}
                alt={firstItem?.name || "Order item"}
              />
              <div className="track-status-body">
                <div className="track-status-top">
                  <div>
                    <div className="track-status-eyebrow">STATUS</div>
                    <div className="track-status-title">Packing</div>
                  </div>
                  <span className="track-status-badge">In Progress</span>
                </div>

                <p className="track-status-eta">
                  Order will be delivered on <strong>{getDeliveryWindow()}</strong>
                </p>

                <div className="track-status-divider" />

                <div className="track-status-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <div className="track-status-row-label">Delivery To</div>
                    <div className="track-status-row-value">
                      {address.name || "Customer"}, {areaName}
                    </div>
                  </div>
                </div>

                <div className="track-status-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="1.5" />
                    <circle cx="18.5" cy="18.5" r="1.5" />
                  </svg>
                  <div>
                    <div className="track-status-row-label">Shipping Method</div>
                    <div className="track-status-row-value">Standard Delivery</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="track-timeline-card">
              <div className="track-timeline-title">Order Timeline</div>

              {TIMELINE.map((step) => (
                <div className="track-timeline-item" key={step.label}>
                  <div className="track-timeline-dot-col">
                    <div className={`track-timeline-dot ${step.done ? "done" : ""}`}>
                      {step.done && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="4 12 9 17 20 6" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className={`track-timeline-label ${step.done ? "done" : ""}`}>{step.label}</div>
                    {step.label === "Delivered" && (
                      <div className="track-timeline-sub">Package delivered {areaName}</div>
                    )}
                    {step.showBar && (
                      <div className="track-timeline-bars">
                        <div
                          className={`track-timeline-bar ${step.done ? "filled" : ""}`}
                          style={{ width: 60 }}
                        />
                        <div
                          className={`track-timeline-bar ${step.done && !step.current ? "filled" : ""}`}
                          style={{ width: 90 }}
                        />
                        {!step.current && <div className="track-timeline-bar" style={{ width: 50 }} />}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}