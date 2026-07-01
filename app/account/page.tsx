"use client";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import { useAddress } from "../context/address-context";
import { authAPI, uploadAPI } from "../lib/api";
import Header from "../components/header";

export default function AccountPage() {
  const { user, updateProfile } = useAuth();
  const { address, updateAddress } = useAddress();
  const router = useRouter();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // ✅ NEW
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "+977 98XXXXXXXX");
      setAddressLine(
        (user as any).address?.line || address.line || "Siddharthanagar, Lumbini Province, Nepal"
      );
      
      if (user.avatar) setAvatar(user.avatar);
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        if (!user) router.push("/login");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, router, address]);

 
  const handleAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    setAvatar(URL.createObjectURL(file));

    try {
      setUploading(true);
      const res = await uploadAPI.uploadAvatar(file);
      // ✅ Replace preview with real server URL
      setAvatar(res.url);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Photo upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name, phone });

      await authAPI.updateProfile({
        address: {
          name,
          phone,
          label: "HOME",
          line: addressLine,
        },
      } as any);

      updateAddress({
        name,
        phone,
        label: "HOME",
        line: addressLine,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const [orderCount, setOrderCount] = useState(0);
  useEffect(() => {
    if (user) {
      import("../lib/api").then(({ orderAPI }) => {
        orderAPI.getMyOrders()
          .then((res) => setOrderCount(res.orders.length))
          .catch(() => {});
      });
    }
  }, [user]);

  const stats = [
    { value: String(orderCount), label: "Orders Placed" },
    { value: "4",                label: "Wishlist Items" },
    { value: "3",                label: "Reviews Written" },
  ];

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
            My Profile
          </h1>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 32 }}>
            Manage your personal information and preferences.
          </p>

          <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e8e4df", marginBottom: 24 }}>
            {/* Avatar Row */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 88, height: 88, borderRadius: "50%", background: avatar ? "transparent" : "#d8f3dc", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #b7e4c7" }}>
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: 36 }}>🌿</span>
                  )}
                </div>

                {/* ✅ Edit button with uploading state */}
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  style={{ position: "absolute", bottom: 0, right: 0, background: uploading ? "#aaa" : "#2d6a4f", border: "2px solid #fff", borderRadius: "50%", width: 28, height: 28, cursor: uploading ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff" }}
                >
                  {uploading ? "⏳" : "✎"}
                </button>

                {/* ✅ Hidden file input */}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatar}
                />
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#1b4332", fontFamily: "Georgia, serif" }}>
                  {name}
                </div>
                <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>{email}</div>

                {/* ✅ Upload button with uploading state */}
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  style={{ marginTop: 10, background: "none", border: "1px solid #2d6a4f", color: "#2d6a4f", borderRadius: 8, padding: "5px 14px", fontSize: 12, cursor: uploading ? "default" : "pointer", fontWeight: 600, opacity: uploading ? 0.6 : 1 }}
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
                </button>

                {/* ✅ Show upload success */}
                {!uploading && avatar && avatar.startsWith("http://localhost") && (
                  <div style={{ fontSize: 11, color: "#2d6a4f", marginTop: 4 }}>
                    ✅ Photo saved to server!
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            {[
              { label: "Full Name",        value: name,        setter: setName,        disabled: false },
              { label: "Email Address",    value: email,       setter: setEmail,       disabled: true  },
              { label: "Phone Number",     value: phone,       setter: setPhone,       disabled: false },
              { label: "Delivery Address", value: addressLine, setter: setAddressLine, disabled: false },
            ].map(({ label, value, setter, disabled }) => (
              <div key={label} style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 12, color: "#666", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {label}
                </label>
                <input
                  value={value}
                  onChange={(e) => !disabled && setter(e.target.value)}
                  disabled={disabled}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", fontSize: 14, color: disabled ? "#aaa" : "#333", background: disabled ? "#f0f0f0" : "#fafaf8", boxSizing: "border-box", outline: "none" }}
                />
              </div>
            ))}

            <button
              onClick={handleSave}
              disabled={saving}
              style={{ marginTop: 8, background: "#2d6a4f", color: "#fff", border: "none", borderRadius: 10, padding: "11px 28px", fontSize: 14, fontWeight: 700, cursor: saving ? "default" : "pointer", opacity: saving ? 0.7 : 1 }}
            >
              {saving ? "Saving..." : saved ? "✓ Changes Saved!" : "Save Changes"}
            </button>
          </div>

          {/* Stats Card */}
          <div style={{ background: "#d8f3dc", borderRadius: 16, padding: "20px 28px", border: "1px solid #b7e4c7", display: "flex", gap: 32 }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#1b4332", fontFamily: "Georgia, serif" }}>{value}</div>
                <div style={{ fontSize: 12, color: "#40916c", fontWeight: 600, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <button
              onClick={() => router.push("/orders")}
              style={{ flex: 1, background: "#fff", border: "1px solid #e8e4df", borderRadius: 12, padding: "14px", fontSize: 13, fontWeight: 700, color: "#1b4332", cursor: "pointer" }}
            >
              📦 My Orders
            </button>
            <button
              onClick={() => router.push("/wishlist")}
              style={{ flex: 1, background: "#fff", border: "1px solid #e8e4df", borderRadius: 12, padding: "14px", fontSize: 13, fontWeight: 700, color: "#1b4332", cursor: "pointer" }}
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
}