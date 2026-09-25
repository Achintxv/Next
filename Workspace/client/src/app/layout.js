import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Kanto",
  description: "Your minimalist hub for productivity.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
