import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masuk / Login | Tokopedia",
  description: "Pixel-perfect clone of tokopedia.com/login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full bg-white font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
