import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://4i-radio.github.io"),
  title: {
    default: "70 COVER NOTES",
    template: "%s | 70 COVER NOTES",
  },
  description:
    "日食なつこ70曲を4iラジオの人物と関係性に重ねて制作した、非公式ジャケット制作記録。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/cover-notes/favicon.svg",
    shortcut: "/cover-notes/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
