interface ButtonProps {
  label: string;
  color?: string; // background color
  textColor?: string;
  width?: number | string; // 200 (px) or "100%"
  height?: number; // px
  onClick?: () => void;
}

const Button = ({
  label,
  color = "#15803d",
  textColor = "#ffffff",
  width = "100%",
  height = 48,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg text-sm font-semibold"
      style={{ backgroundColor: color, color: textColor, width, height }}
    >
      {label}
    </button>
  );
};

export default Button;
