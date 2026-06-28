"use client";
// app/hooks/useProducts.ts
// Use this hook in any page to fetch real products from your backend.

import { useState, useEffect } from "react";
import { productAPI, Product } from "../lib/api";

interface UseProductsOptions {
  category?: string;
  sort?: string;
  search?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    productAPI
      .getAll(options)
      .then((res) => setProducts(res.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.category, options.sort, options.search]);

  return { products, loading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productAPI
      .getById(id)
      .then((res) => setProduct(res.product))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}