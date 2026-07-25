"use client";

import { useEffect, useState } from "react";
import { adminAPI, productAPI, Product } from "../../lib/api";

const emptyForm = {
  name: "",
  price: 0,
  category: "",
  description: "",
  images: [""],
  badge: "",
  stock: 0,
  featured: false,
  types: [""],
  colors: [""],
  shippingNote: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    productAPI.getAll().then((res) => setProducts(res.products)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description || "",
      images: p.images?.length ? p.images : [""],
      badge: p.badge || "",
      stock: p.stock || 0,
      featured: p.featured || false,
      types: p.types?.length ? p.types : [""],
      colors: p.colors?.length ? p.colors : [""],
      shippingNote: p.shippingNote || "",
    });
    setEditingId(p._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images.filter((x: string) => x.trim()),
      types: form.types.filter((x: string) => x.trim()),
      colors: form.colors.filter((x: string) => x.trim()),
    };
    try {
      if (editingId) {
        await adminAPI.updateProduct(editingId, payload);
      } else {
        await adminAPI.createProduct(payload);
      }
      setShowModal(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await adminAPI.deleteProduct(id);
    load();
  };

  const updateListField = (field: "images" | "types" | "colors", idx: number, val: string) => {
    const copy = [...form[field]];
    copy[idx] = val;
    setForm({ ...form, [field]: copy });
  };

  const addListField = (field: "images" | "types" | "colors") => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  return (
    <>
      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .btn-primary { background: #2d4a2d; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; }
        .prod-table { width: 100%; background: #fff; border-radius: 10px; border-collapse: collapse; overflow: hidden; }
        .prod-table th { text-align: left; font-size: 11px; color: #aaa; text-transform: uppercase; padding: 12px 16px; border-bottom: 1px solid #eee; }
        .prod-table td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #f4f3ef; vertical-align: middle; }
        .prod-thumb { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; }
        .action-btn { background: none; border: none; cursor: pointer; font-size: 13px; margin-right: 10px; color: #2d4a2d; font-weight: 600; }
        .action-btn.danger { color: #b3382c; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .modal { background: #fff; border-radius: 12px; padding: 28px; width: 520px; max-height: 85vh; overflow-y: auto; }
        .modal h2 { font-size: 18px; font-weight: 800; margin-bottom: 18px; }
        .form-row { margin-bottom: 14px; }
        .form-row label { display: block; font-size: 12px; font-weight: 700; color: #555; margin-bottom: 5px; }
        .form-row input, .form-row select, .form-row textarea { width: 100%; padding: 9px 12px; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 13px; }
        .form-row-inline { display: flex; gap: 10px; margin-bottom: 6px; }
        .add-link { font-size: 12px; color: #2d4a2d; font-weight: 700; cursor: pointer; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
        .btn-secondary { background: #f0f0f0; border: none; padding: 10px 18px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; }
      `}</style>

      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Products</h1>
          <p style={{ fontSize: 13, color: "#888" }}>Manage your product catalog.</p>
        </div>
        <button className="btn-primary" onClick={openNew}>+ Add Product</button>
      </div>

      {loading ? (
        <div style={{ padding: 40, color: "#888" }}>Loading...</div>
      ) : (
        <table className="prod-table">
          <thead>
            <tr>
              <th></th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td><img className="prod-thumb" src={p.images?.[0] || "/images/image1.png"} alt="" /></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>Rs {p.price}</td>
                <td>{p.stock ?? 0}</td>
                <td>
                  <button className="action-btn" onClick={() => openEdit(p)}>Edit</button>
                  <button className="action-btn danger" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

            <div className="form-row">
              <label>Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-row-inline">
              <div className="form-row" style={{ flex: 1 }}>
                <label>Price (Rs)</label>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="form-row" style={{ flex: 1 }}>
                <label>Stock</label>
                <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <label>Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Clothing, Bedding, Accessories..." />
            </div>
            <div className="form-row">
              <label>Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-row">
              <label>Badge (optional)</label>
              <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. New, Bestseller" />
            </div>
            <div className="form-row">
              <label>Shipping Note</label>
              <input value={form.shippingNote} onChange={(e) => setForm({ ...form, shippingNote: e.target.value })} />
            </div>

            <div className="form-row">
              <label>Images (URLs)</label>
              {form.images.map((img: string, i: number) => (
                <input key={i} style={{ marginBottom: 6 }} value={img}
                  onChange={(e) => updateListField("images", i, e.target.value)}
                  placeholder="/images/example.png" />
              ))}
              <span className="add-link" onClick={() => addListField("images")}>+ Add image</span>
            </div>

            <div className="form-row">
              <label>Types (e.g. Small, Medium, Large)</label>
              {form.types.map((t: string, i: number) => (
                <input key={i} style={{ marginBottom: 6 }} value={t}
                  onChange={(e) => updateListField("types", i, e.target.value)} />
              ))}
              <span className="add-link" onClick={() => addListField("types")}>+ Add type</span>
            </div>

            <div className="form-row">
              <label>Colors</label>
              {form.colors.map((c: string, i: number) => (
                <input key={i} style={{ marginBottom: 6 }} value={c}
                  onChange={(e) => updateListField("colors", i, e.target.value)} />
              ))}
              <span className="add-link" onClick={() => addListField("colors")}>+ Add color</span>
            </div>

            <div className="form-row" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} style={{ width: "auto" }} />
              <label style={{ marginBottom: 0 }}>Featured product</label>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}