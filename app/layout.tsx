import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}