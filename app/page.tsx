"use client";

import { useEffect, useState } from "react";
import { Composer } from "@/components/chat/Composer";
import { Header } from "@/components/chat/Header";
import { MessageList } from "@/components/chat/MessageList";
import { PUBLIC_CONFIG } from "@/lib/config";
import { trackJSError, trackPageView } from "@/lib/telemetry";

export default function HomePage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    trackPageView("/");
  }, []);

  async function handleSubmit() {
    setErrorMessage(null);

    try {
      const response = await fetch("/api/health", { method: "GET" });
      if (!response.ok) {
        throw new Error(`health check failed: ${response.status}`);
      }

      const data = (await response.json()) as { apiConfigured?: boolean };

      if (!data.apiConfigured) {
        const message = "API 未配置，请联系管理员完成 DEEPSEEK_API_KEY 配置。";
        setErrorMessage(message);
        trackJSError(message, "composer_submit");
        return;
      }

      setErrorMessage("US-01 已完成，发送能力将在 US-02 接入。");
    } catch (error) {
      const message = "系统检查失败，请稍后重试。";
      setErrorMessage(message);
      trackJSError(error, "health_check");
    }
  }

  return (
    <main style={{ display: "grid", placeItems: "center", padding: "20px 12px" }}>
      <section
        style={{
          width: "min(860px, 100%)",
          minHeight: "70vh",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          background: "var(--panel)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.04)",
        }}
      >
        <Header title={PUBLIC_CONFIG.appName} />
        <MessageList guideText={PUBLIC_CONFIG.guideText} />
        {errorMessage ? (
          <div
            role="alert"
            style={{
              margin: "0 14px 12px",
              border: "1px solid #fda4af",
              background: "#fff1f2",
              color: "#9f1239",
              borderRadius: "10px",
              padding: "10px 12px",
              fontSize: "13px",
            }}
          >
            {errorMessage}
          </div>
        ) : null}
        <Composer placeholder={PUBLIC_CONFIG.inputPlaceholder} onSubmit={handleSubmit} />
      </section>
    </main>
  );
}
