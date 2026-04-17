"use client";

import { useMemo, useState } from "react";

interface ComposerProps {
  placeholder: string;
  onSubmit: () => Promise<void>;
}

export function Composer({ placeholder, onSubmit }: ComposerProps) {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !isSubmitting,
    [input, isSubmitting],
  );

  async function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "14px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "12px",
      }}
    >
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={placeholder}
        rows={2}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void handleSubmit();
          }
        }}
        style={{
          resize: "vertical",
          border: "1px solid var(--line)",
          borderRadius: "10px",
          padding: "10px 12px",
          fontSize: "14px",
          lineHeight: 1.6,
        }}
      />
      <button
        type="button"
        onClick={() => void handleSubmit()}
        disabled={!canSubmit}
        style={{
          minWidth: "84px",
          border: 0,
          borderRadius: "10px",
          fontWeight: 600,
          background: canSubmit ? "var(--brand)" : "#94a3b8",
          color: "white",
          cursor: canSubmit ? "pointer" : "not-allowed",
          padding: "0 14px",
        }}
      >
        {isSubmitting ? "检查中..." : "发送"}
      </button>
    </footer>
  );
}
