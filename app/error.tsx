"use client";

import { useEffect } from "react";
import { trackJSError } from "@/lib/telemetry";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    trackJSError(error, "global_error_boundary");
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <section
        style={{
          border: "1px solid #fecdd3",
          background: "#fff1f2",
          color: "#881337",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "420px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>页面加载失败</h2>
        <p style={{ lineHeight: 1.6 }}>请刷新页面重试。如果问题持续存在，请稍后再试。</p>
        <button
          type="button"
          onClick={reset}
          style={{
            border: 0,
            background: "#e11d48",
            color: "white",
            borderRadius: "8px",
            padding: "10px 14px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          重新加载
        </button>
      </section>
    </main>
  );
}
