import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/mainHeader";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // title: "lol-persona",
  // description: "lol-persona",
  // icons: {
  //   icon: "/main-logo.svg",
  // },
  title: "lol-persona",
  description: "lol-persona: Analyze your League of Legends personality",
  icons: {
    icon: "/main-logo.svg",
  },
  openGraph: {
    title: "lol-persona",
    description: "Analyze your League of Legends personality",
    images: [
      {
        url: "https://lol-persona.pages.dev/metaImg.png", // 실제 이미지 URL로 교체하세요
        width: 1200,
        height: 630,
        alt: "lol-persona preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "lol-persona",
    description: "Analyze your League of Legends personality",
    images: ["https://lol-persona.pages.dev/metaImg.png"],
    creator: "@padak94", // 옵션: 귀하의 Twitter 핸들을 추가하세요
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8647279125417942"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
