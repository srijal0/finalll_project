"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface ShippingAddress {
  name: string;
  phone: string;
  label: string;
  line: string;
}

interface AddressContextType {
  address: ShippingAddress;
  updateAddress: (address: ShippingAddress) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const ADDRESS_KEY = "ecohaven_address";

const defaultAddress: ShippingAddress = {
  name: "",
  phone: "98xxxxxxxx",
  label: "HOME",
  line: "Dillibazar, Pipalbot",
};

export function AddressProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<ShippingAddress>(defaultAddress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ADDRESS_KEY);
      if (raw) setAddress(JSON.parse(raw));
    } catch {
      // ignore corrupt address
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
    }
  }, [address, loaded]);

  const updateAddress = (next: ShippingAddress) => setAddress(next);

  return (
    <AddressContext.Provider value={{ address, updateAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddress must be used within an AddressProvider");
  return ctx;
}