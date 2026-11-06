import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://4i-radio.github.io"),
  title: "4i-RADIO / MIYAZAKI KAZUMA",
  description:
    "4iラジオ・宮崎一馬の個人ページ。メンバーについての記録、日々続いていること、猫・ポラリスの生活ログ。",
  icons: {
    icon: {
      url: "/members/miyazaki/miyazaki-guide-icon.svg",
      type: "image/svg+xml",
    },
    shortcut: "/members/miyazaki/miyazaki-guide-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
