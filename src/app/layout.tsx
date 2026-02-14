import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Bookmark - Your Personal Bookmark Manager",
  description:
    "A beautiful, real-time bookmark manager. Save, organize, and access your favorite links from anywhere. Sign in with Google to get started.",
  keywords: ["bookmarks", "bookmark manager", "save links", "organize bookmarks"],
  openGraph: {
    title: "Smart Bookmark - Your Personal Bookmark Manager",
    description:
      "Save, organize, and access your favorite links in real-time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  );
}
