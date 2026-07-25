"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";

const navItems = [
  { label: "Overview", href: "/admin", icon: "📊" },
  { label: "Products", href: "/admin/products", icon: "🛍️" },
  { label: "Orders", href: "/admin/orders", icon: "📦" },
  { label: "Users", href: "/admin/users", icon: "👤" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: "center", color: "#888" }}>
        Loading...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null; // redirect is in-flight
  }

  return (
    <>
      <style>{`
        .admin-shell { display: flex; min-height: 100vh; background: #f4f3ef; font-family: 'Segoe UI', sans-serif; }
        .admin-sidebar { width: 230px; flex-shrink: 0; background: #1a2e1f; color: #fff; padding: 24px 0; }
        .admin-logo { font-size: 17px; font-weight: 800; padding: 0 24px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 16px; }
        .admin-nav-item { display: flex; align-items: center; gap: 10px; padding: 12px 24px; font-size: 13px; font-weight: 600; color: #cdd8cf; cursor: pointer; transition: background 0.15s; }
        .admin-nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .admin-main { flex: 1; padding: 32px 40px; }
      `}</style>
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-logo">🌿 EcoHaven Admin</div>
          <nav>
            {navItems.map((item) => (
              <div
                key={item.href}
                className="admin-nav-item"
                onClick={() => router.push(item.href)}
              >
                <span>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </>
  );
}