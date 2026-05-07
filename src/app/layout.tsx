import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "스펙트리파이 | 생활 정보 · 지원금 · 절약 가이드",
    template: "%s | 스펙트리파이",
  },
  description:
    "정부 지원금, 서류 발급, 절약 꿀팁까지. 꼭 필요한 생활 정보를 쉽고 빠르게 안내합니다.",
  openGraph: {
    siteName: "스펙트리파이",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-geist-sans)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
