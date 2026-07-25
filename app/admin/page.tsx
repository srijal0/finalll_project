"use client";

import { useEffect, useState } from "react";
import { adminAPI, productAPI, OrderRecord, User, Product } from "../lib/api";

export default function AdminOverview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productAPI.getAll(),
      adminAPI.getAllOrders(),
      adminAPI.getAllUsers(),
    ])
      .then(([p, o, u]) => {
        setProducts(p.products);
        setOrders(o.orders);
        setUsers(u.users);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Total Products", value: products.length, icon: "🛍️" },
    { label: "Total Orders", value: orders.length, icon: "📦" },
    { label: "Total Users", value: users.length, icon: "👤" },
    { label: "Revenue", value: `Rs ${totalRevenue.toLocaleString()}`, icon: "💰" },
  ];

  return (
    <>
      <style>{`
        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .stat-card { background: #fff; border-radius: 10px; padding: 20px; }
        .stat-icon { font-size: 22px; margin-bottom: 8px; }
        .stat-value { font-size: 24px; font-weight: 800; color: #1a1a1a; }
        .stat-label { font-size: 12px; color: #888; margin-top: 2px; }
        .recent-title { font-size: 16px; font-weight: 800; margin-bottom: 14px; }
        .recent-table { width: 100%; background: #fff; border-radius: 10px; overflow: hidden; border-collapse: collapse; }
        .recent-table th { text-align: left; font-size: 11px; color: #aaa; text-transform: uppercase; padding: 12px 16px; border-bottom: 1px solid #eee; }
        .recent-table td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #f4f3ef; }
        .status-pill { font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
        .status-Processing { background: #fff3cd; color: #856404; }
        .status-Shipped { background: #cfe2ff; color: #084298; }
        .status-Delivered { background: #d1e7dd; color: #0f5132; }
        .status-Cancelled { background: #f8d7da; color: #842029; }
      `}</style>

      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Dashboard</h1>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>
        Welcome back — here's what's happening in your store.
      </p>

      {loading ? (
        <div style={{ padding: 40, color: "#888" }}>Loading...</div>
      ) : (
        <>
          <div className="stat-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <h2 className="recent-title">Recent Orders</h2>
          <table className="recent-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((o) => (
                <tr key={o._id}>
                  <td>{o.orderNumber}</td>
                  <td>{typeof o.user === "object" ? o.user?.name : "—"}</td>
                  <td>Rs {o.total}</td>
                  <td>
                    <span className={`status-pill status-${o.status}`}>{o.status}</span>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}