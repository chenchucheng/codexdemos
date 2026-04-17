interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header
      style={{
        padding: "18px 20px",
        borderBottom: "1px solid var(--line)",
        fontWeight: 700,
        fontSize: "18px",
      }}
    >
      {title}
    </header>
  );
}
