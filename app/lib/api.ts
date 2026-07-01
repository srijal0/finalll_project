// app/lib/api.ts
// All API calls to your Express backend go through this file

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ─── Helper: get JWT token from localStorage ───
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ecohaven_token");
}

// ─── Helper: build headers ───
function headers(auth = false): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) h["Authorization"] = `Bearer ${token}`;
  }
  return h;
}


async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  auth = false
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: headers(auth),
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data as T;
}


export const authAPI = {
  // POST /api/auth/register
  signup: (name: string, email: string, password: string) =>
    request<{ token: string; user: User }>("POST", "/auth/register", {
      name,
      email,
      password,
    }),

  // POST /api/auth/login
  login: (email: string, password: string) =>
    request<{ token: string; user: User }>("POST", "/auth/login", {
      email,
      password,
    }),

  // GET /api/auth/me  (requires JWT)
  getMe: () => request<{ user: User }>("GET", "/auth/me", undefined, true),

  // PUT /api/auth/profile  (requires JWT)
  updateProfile: (data: Partial<User>) =>
    request<{ user: User }>("PUT", "/auth/profile", data, true),

  // PUT /api/auth/password  (requires JWT)
  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ message: string }>(
      "PUT",
      "/auth/password",
      { currentPassword, newPassword },
      true
    ),
};



export const productAPI = {
  // GET /api/products
  getAll: (params?: { category?: string; sort?: string; search?: string }) => {
    const query = new URLSearchParams(
      Object.entries(params || {}).filter(([, v]) => v) as [string, string][]
    ).toString();
    return request<{ products: Product[] }>(
      "GET",
      `/products${query ? `?${query}` : ""}`
    );
  },

  // GET /api/products/:id
  getById: (id: string) =>
    request<{ product: Product }>("GET", `/products/${id}`),

  // GET /api/products/featured
  getFeatured: () =>
    request<{ products: Product[] }>("GET", "/products/featured"),
};

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  createdAt?: string;
}

// In app/lib/api.ts — update the Product interface
export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  images: string[];
  rating?: number;
  reviews?: number;
  badge?: string;
  stock?: number;
  featured?: boolean;
  // ✅ ADD THESE:
  types?: string[];
  colors?: string[];
  shippingNote?: string;
}
// Add this to api.ts after productAPI

export const orderAPI = {
  // POST /api/orders — create order
  create: (data: {
    items: {
      productId: string;
      name: string;
      img: string;
      price: number;
      quantity: number;
      selectedType?: string;
      selectedColor?: string;
    }[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    paymentMethod: string;
  }) => request<{ order: OrderRecord }>("POST", "/orders", data, true),

  // GET /api/orders/my — get my orders
  getMyOrders: () =>
    request<{ orders: OrderRecord[] }>("GET", "/orders/my", undefined, true),
};

export interface OrderRecord {
  _id: string;
  orderNumber: string;
  items: {
    productId: string;
    name: string;
    img: string;
    price: number;
    quantity: number;
    selectedType?: string;
    selectedColor?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}
// Add this to app/lib/api.ts after authAPI

export const addressAPI = {
  // Save address to user profile
  save: (address: {
    name: string;
    phone: string;
    label: string;
    line: string;
  }) =>
    request<{ user: User }>(
      "PUT",
      "/auth/profile",
      { address },
      true
    ),
};
// Add this to api.ts
export const uploadAPI = {
  uploadAvatar: async (file: File): Promise<{ url: string; user: User }> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const token = localStorage.getItem("ecohaven_token");

    const res = await fetch(`${BASE_URL}/upload/avatar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // ✅ Don't set Content-Type for FormData
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data;
  },
};