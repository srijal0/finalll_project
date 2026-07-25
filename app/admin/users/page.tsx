"use client";

import { useEffect, useState } from "react";
import { adminAPI, User } from "../../lib/api";
import { useAuth } from "../../context/auth-context";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminAPI.getAllUsers().then((res) => setUsers(res.users)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const toggleRole = async (u: User) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    if (!confirm(`Make ${u.name} ${newRole === "admin" ? "an admin" : "a regular user"}?`)) return;
    await adminAPI.updateUserRole(u._id, newRole);
    setUsers((prev) => prev.map((x) => (x._id === u._id ? { ...x, role: newRole } : x)));
  };

  return (
    <>
      <style>{`
        .usr-table { width: 100%; background: #fff; border-radius: 10px; border-collapse: collapse; overflow: hidden; }
        .usr-table th { text-align: left; font-size: 11px; color: #aaa; text-transform: uppercase; padding: 12px 16px; border-bottom: 1px solid #eee; }
        .usr-table td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #f4f3ef; vertical-align: middle; }
        .role-pill { font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; }
        .role-admin { background: #e8f4ec; color: #2d4a2d; }
        .role-user { background: #f0f0f0; color: #777; }
        .action-btn { background: none; border: none; cursor: pointer; font-size: 12px; color: #2d4a2d; font-weight: 700; }
      `}</style>

      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Users</h1>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Manage customer accounts and admin access.</p>

      {loading ? (
        <div style={{ padding: 40, color: "#888" }}>Loading...</div>
      ) : (
        <table className="usr-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Joined</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td>
                <td><span className={`role-pill role-${u.role || "user"}`}>{u.role || "user"}</span></td>
                <td>
                  {u._id !== currentUser?._id && (
                    <button className="action-btn" onClick={() => toggleRole(u)}>
                      {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}