import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prompt 优化助手",
  description: "极简、无门槛的 Prompt 优化工具",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
