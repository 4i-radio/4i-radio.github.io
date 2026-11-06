import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://4i-radio.github.io"),
  title: "山田牧場 | 北海道・十勝",
  description: "北海道・十勝で家族とスタッフが営む酪農牧場、山田牧場の公式サイトです。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: [
      { url: "/farm/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/farm/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/farm/favicon.ico?v=2",
    apple: [
      { url: "/farm/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
