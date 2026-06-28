"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import { orderAPI, OrderRecord } from "../lib/api";
import Header from "../components/header";

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTimeout(() => router.push("/login"), 500);
      return;
    }
    orderAPI
      .getMyOrders()
      .then((res) => setOrders(res.orders))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user, router]);

  const getStatusColor = (status: string) => {
    if (status === "Delivered") return { color: "#2d6a4f", bg: "#d8f3dc" };
    if (status === "Shipped")   return { color: "#b45309", bg: "#fef3c7" };
    if (status === "Cancelled") return { color: "#b3382c", bg: "#fdecec" };
    return { color: "#1d4ed8", bg: "#dbeafe" };
  };

  // ✅ Save order to localStorage then navigate to track page
  const handleTrack = (order: OrderRecord) => {
    localStorage.setItem(
      "ecohaven_last_order",
      JSON.stringify({
        items: order.items.map((item) => ({
          id: item.productId,
          name: item.name,
          img: item.img,
          priceValue: item.price,
          quantity: item.quantity,
          selectedType: item.selectedType || "",
          selectedColor: item.selectedColor || "",
        })),
        subtotal: order.subtotal,
        total: order.total,
        orderNumber: order.orderNumber,
        date: order.createdAt,
      })
    );
    router.push("/track-order");
  };

  if (loading) {
    return (
      <>
        <Header activePage="Home" />
        <div style={{ minHeight: "100vh", background: "#f5f0eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "#2d6a4f", fontSize: 16, fontWeight: 600 }}>Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header activePage="Home" />
      <div style={{ minHeight: "100vh", background: "#f5f0eb" }}>
        <div style={{ maxWidth: 680, margin: "40px auto", padding: "0 24px" }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 28, color: "#1b4332", marginBottom: 4 }}>
            My Orders
          </h1>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 32 }}>
            Track and review your past purchases.
          </p>

          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: 14 }}>
              No orders yet.{" "}
              <button
                onClick={() => router.push("/shop")}
                style={{ color: "#2d6a4f", background: "none", border: "none", cursor: "pointer", fontWeight: 700, textDecoration: "underline" }}
              >
                Start shopping!
              </button>
            </div>
          ) : (
            orders.map((order) => {
              const { color, bg } = getStatusColor(order.status);
              return (
                <div key={order._id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8e4df", marginBottom: 16, overflow: "hidden" }}>
                  
                  {/* ── ORDER HEADER ── */}
                  <div
                    onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                    style={{ padding: "18px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", background: expanded === order._id ? "#fafaf8" : "#fff" }}
                  >
                    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "#1b4332", fontFamily: "Georgia, serif" }}>
                          {order.orderNumber}
                        </div>
                        <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                          {new Date(order.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </div>
                      </div>
                      <span style={{ background: bg, color, borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontWeight: 700, color: "#1b4332", fontSize: 15 }}>Rs{order.total}</span>
                      <span style={{ color: "#aaa", fontSize: 18 }}>{expanded === order._id ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {/* ── ORDER DETAILS (expanded) ── */}
                  {expanded === order._id && (
                    <div style={{ borderTop: "1px solid #f0ebe5", padding: "16px 24px" }}>
                      
                      {/* Items list */}
                      {order.items.map((item, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < order.items.length - 1 ? "1px solid #f5f0eb" : "none" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <img
                              src={item.img || "/images/image1.png"}
                              alt={item.name}
                              style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover" }}
                            />
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{item.name}</div>
                              <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>
                                Qty: {item.quantity}
                                {item.selectedType && (
                                  <span style={{ marginLeft: 8, background: "#2d6a4f", color: "#fff", borderRadius: 4, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>
                                    {item.selectedType}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <span style={{ fontWeight: 700, color: "#1b4332" }}>
                            Rs{item.price * item.quantity}
                          </span>
                        </div>
                      ))}

                      {/* ── ACTION BUTTONS ── */}
                      <div style={{ marginTop: 14, padding: "12px 0 0", borderTop: "1px solid #e8e4df", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                          
                          <button
                            style={{ background: "#2d6a4f", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                          >
                            Reorder
                          </button>

                          <button
                            style={{ background: "none", color: "#2d6a4f", border: "1px solid #2d6a4f", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                          >
                            View Receipt
                          </button>

                          {/* ✅ NEW: Track button */}
                          <button
                            onClick={() => handleTrack(order)}
                            style={{ background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                          >
                            📍 Track
                          </button>

                        </div>
                        <div style={{ fontSize: 13, color: "#666" }}>
                          Total: <strong style={{ color: "#1b4332" }}>Rs{order.total}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}