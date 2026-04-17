interface MessageListProps {
  guideText: string;
}

export function MessageList({ guideText }: MessageListProps) {
  return (
    <section
      aria-label="对话区域"
      style={{
        flex: 1,
        padding: "28px 20px",
        color: "var(--subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.7 }}>{guideText}</p>
    </section>
  );
}
