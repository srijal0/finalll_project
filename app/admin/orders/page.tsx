"use client";

import { useEffect, useState } from "react";
import { adminAPI, OrderRecord } from "../../lib/api";

const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminAPI.getAllOrders().then((res) => setOrders(res.orders)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await adminAPI.updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  return (
    <>
      <style>{`
        .ord-table { width: 100%; background: #fff; border-radius: 10px; border-collapse: collapse; overflow: hidden; }
        .ord-table th { text-align: left; font-size: 11px; color: #aaa; text-transform: uppercase; padding: 12px 16px; border-bottom: 1px solid #eee; }
        .ord-table td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #f4f3ef; vertical-align: middle; }
        .ord-status-select { padding: 6px 10px; border-radius: 6px; border: 1px solid #e0e0e0; font-size: 12px; font-weight: 600; }
      `}</style>

      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Orders</h1>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>View and manage customer orders.</p>

      {loading ? (
        <div style={{ padding: 40, color: "#888" }}>Loading...</div>
      ) : (
        <table className="ord-table">
          <thead>
            <tr>
              <th>Order #</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Date</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.orderNumber}</td>
                <td>
                  {typeof o.user === "object" ? (
                    <>{o.user?.name}<br /><span style={{ color: "#aaa", fontSize: 11 }}>{o.user?.email}</span></>
                  ) : "—"}
                </td>
                <td>{o.items.length} item(s)</td>
                <td>Rs {o.total}</td>
                <td>{o.paymentMethod}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    className="ord-status-select"
                    value={o.status}
                    onChange={(e) => handleStatusChange(o._id, e.target.value)}
                  >
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}