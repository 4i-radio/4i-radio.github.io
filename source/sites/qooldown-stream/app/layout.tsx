import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://4i-radio.github.io"),
  title: "くーるだうん LIVE",
  description: "くーるだうん（@qooldown）のゲーム配信チャンネル。配信時間は不定期です。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/stream/qooldown-avatar.jpg",
    shortcut: "/stream/qooldown-avatar.jpg",
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
