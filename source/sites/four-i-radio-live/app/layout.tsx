import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://4i-radio.github.io"),
  title: "4i RADIO LIVE",
  description:
    "毎週金曜26時から。次回放送までコメントログを公開する4iラジオのライブページ。",
  openGraph: {
    title: "4i RADIO LIVE",
    description: "FRIDAY 26:00 / TOKYO — コメントログは次回放送まで公開中。",
    type: "website",
    url: "https://4i-radio.github.io/live/",
    images: [
      {
        url: "https://4i-radio.github.io/live/og.png",
        width: 1731,
        height: 909,
        alt: "4i RADIO LIVE — FRIDAY 26:00 / TOKYO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4i RADIO LIVE",
    description: "FRIDAY 26:00 / TOKYO — コメントログは次回放送まで公開中。",
    images: ["https://4i-radio.github.io/live/og.png"],
  },
  icons: {
    icon: {
      url: "/live/radio-live-icon.svg",
      type: "image/svg+xml",
    },
    shortcut: "/live/radio-live-icon.svg",
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
