import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://4i-radio.github.io/members/yamada/"),
  title: "くーるだうん | C.Yamada",
  description: "くーるだうんのゲーム配信、ゲームログ、4i RADIOと雑記。",
  openGraph: {
    title: "くーるだうん | C.Yamada",
    description: "ゲームしたり、ラジオに出たりしています。配信はだいたい突然です。",
    url: "https://4i-radio.github.io/members/yamada/",
    siteName: "C.Yamada",
    type: "website",
    images: [
      {
        url: "/members/yamada/og.png",
        width: 1200,
        height: 630,
        alt: "くーるだうん @qooldown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "くーるだうん | C.Yamada",
    description: "ゲームしたり、ラジオに出たりしています。配信はだいたい突然です。",
    images: ["/members/yamada/og.png"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/members/yamada/yamada-avatar.jpg",
    shortcut: "/members/yamada/yamada-avatar.jpg",
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
