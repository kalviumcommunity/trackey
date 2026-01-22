interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({
  label,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white px-4 py-2 rounded"
      : "bg-gray-200 text-black px-4 py-2 rounded";

  return (
    <button onClick={onClick} className={styles}>
      {label}
    </button>
  );
}
