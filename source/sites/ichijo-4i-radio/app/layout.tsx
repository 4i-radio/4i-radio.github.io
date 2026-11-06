import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://4i-radio.github.io/members/ichijo/"),
  title: "植物記録 | PLANT LOG",
  description: "育てている観葉植物の、現在の姿と鉢ごとの管理記録。",
  openGraph: {
    title: "植物記録 | PLANT LOG",
    description: "育てている観葉植物の、現在の姿と鉢ごとの管理記録。",
    type: "website",
    url: "https://4i-radio.github.io/members/ichijo/",
    images: [
      {
        url: "https://4i-radio.github.io/members/ichijo/og.png",
        width: 1200,
        height: 630,
        alt: "PLANT LOG 植物記録",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "植物記録 | PLANT LOG",
    description: "育てている観葉植物の、現在の姿と鉢ごとの管理記録。",
    images: ["https://4i-radio.github.io/members/ichijo/og.png"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/members/ichijo/favicon.svg",
    shortcut: "/members/ichijo/favicon.svg",
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
