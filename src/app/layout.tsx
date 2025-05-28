import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "吵架包赢 - AI助你智慧回击",
  description: "AI助你击败群雄，智慧回击每一句。选择攻击风格，调节语气强度，让AI为你生成完美的回击内容。",
  keywords: "吵架,回击,AI,智慧,辩论,语言艺术",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
