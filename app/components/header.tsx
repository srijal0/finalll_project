"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import { useCart } from "../context/cart-context";

interface HeaderProps {
  activePage?: string;
}

export default function Header({ activePage = "Home" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <>
      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 80px;
          height: 60px;
          background: #fff;
          border-bottom: 1px solid #ebebeb;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-logo {
          font-size: 20px;
          font-weight: 800;
          color: #2d4a2d;
          letter-spacing: -0.5px;
          text-decoration: none;
        }
        .header-logo span { color: #7aad6a; }
        .header-nav {
          display: flex;
          gap: 32px;
          list-style: none;
        }
        .header-nav a {
          font-size: 13px;
          font-weight: 500;
          color: #444;
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .header-nav a:hover,
        .header-nav a.active {
          color: #2d4a2d;
          border-bottom-color: #2d4a2d;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .search-bar {
          display: flex;
          align-items: center;
          background: #f5f5f3;
          border-radius: 20px;
          padding: 6px 14px;
          gap: 8px;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          min-width: 200px;
        }
        .search-bar:hover {
          background: #eef0ec;
          box-shadow: 0 0 0 2px #c5dcc5;
        }
        .search-bar input {
          border: none;
          background: transparent;
          font-size: 12px;
          color: #555;
          outline: none;
          width: 160px;
          cursor: pointer;
        }
        .search-bar input::placeholder { color: #aaa; }
        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #444;
          font-size: 18px;
          padding: 4px;
          display: flex;
          align-items: center;
          position: relative;
        }
        .icon-btn:hover { color: #2d4a2d; }
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -6px;
          background: #2d4a2d;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          border-radius: 10px;
          min-width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
        }

        /* ── ACCOUNT DROPDOWN ── */
        .account-wrap {
          position: relative;
        }
        .account-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          color: #444;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 10px;
          border-radius: 20px;
          transition: background 0.15s, color 0.15s;
        }
        .account-btn:hover { background: #f0f7f2; color: #2d4a2d; }
        .account-btn.open { background: #e8f4ec; color: #2d4a2d; }

        .account-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
          min-width: 180px;
          overflow: hidden;
          animation: dropIn 0.15s ease;
          z-index: 200;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .dropdown-header {
          padding: 14px 16px 10px;
          border-bottom: 1px solid #f0f0f0;
        }
        .dropdown-name {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .dropdown-email {
          font-size: 11px;
          color: #aaa;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 148px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          font-size: 13px;
          color: #444;
          cursor: pointer;
          transition: background 0.12s, color 0.12s;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }
        .dropdown-item:hover { background: #f5f9f5; color: #2d4a2d; }
        .dropdown-item svg { flex-shrink: 0; }

        .dropdown-divider { height: 1px; background: #f0f0f0; margin: 2px 0; }

        .dropdown-logout {
          color: #c0392b;
        }
        .dropdown-logout:hover { background: #fff5f5; color: #c0392b; }

        .hamburger {
          display: none;
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: #2d4a2d;
        }

        @media (max-width: 900px) {
          .header { padding: 0 24px; }
          .header-nav { display: none; }
          .search-bar { display: none; }
          .hamburger { display: block; }
          .header-nav.open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0; right: 0;
            background: #fff;
            padding: 20px 24px;
            border-bottom: 1px solid #ebebeb;
            gap: 16px;
          }
        }
      `}</style>

      <header className="header">
        <a href="/" className="header-logo">Eco<span>Haven</span></a>

        <ul className={`header-nav${menuOpen ? " open" : ""}`}>
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} className={activePage === link.label ? "active" : ""}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="header-right">
          {/* Search bar → goes to /shop */}
          <div
            className="search-bar"
            onClick={() => router.push("/shop")}
            role="button"
            aria-label="Search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search for anything..." readOnly />
          </div>

          {/* Wishlist */}
          <button className="icon-btn" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Cart */}
          <button className="icon-btn" aria-label="Cart" onClick={() => router.push("/cart")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>

          {/* Account with dropdown */}
          <div className="account-wrap" ref={dropdownRef}>
            <button
              className={`account-btn${dropdownOpen ? " open" : ""}`}
              onClick={() => user ? setDropdownOpen(o => !o) : router.push("/login")}
              aria-label="Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {user ? user.name.split(" ")[0] : "Sign In"}
              {user && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              )}
            </button>

            {dropdownOpen && user && (
              <div className="account-dropdown">
                {/* User info */}
                <div className="dropdown-header">
                  <div className="dropdown-name">{user.name}</div>
                  <div className="dropdown-email">{user.email}</div>
                </div>

                {/* Menu items */}
                <button className="dropdown-item" onClick={() => { router.push("/account"); setDropdownOpen(false); }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  My Profile
                </button>

                <button className="dropdown-item" onClick={() => { router.push("/orders"); setDropdownOpen(false); }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  My Orders
                </button>

                <button className="dropdown-item" onClick={() => { router.push("/wishlist"); setDropdownOpen(false); }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  Wishlist
                </button>

                <div className="dropdown-divider" />

                <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Log Out
                </button>
              </div>
            )}
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </header>
    </>
  );
}