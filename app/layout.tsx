import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/auth-context";
import { CartProvider } from "./context/cart-context";
import { AddressProvider } from "./context/address-context";

export const metadata: Metadata = {
  title: "EcoHaven – Ethical Essentials for a Conscious Home",
  description: "Sustainable home goods, handcrafted jewelry, and eco-friendly accessories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <AddressProvider>{children}</AddressProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}