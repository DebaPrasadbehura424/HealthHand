import type { IconType } from "react-icons";

interface IconBoxProps {
  icon: IconType;
  color?: string; // icon color
  bgColor?: string; // background color (shown transparent)
  bgOpacity?: number; // 0 to 1
  width?: number; // px
  height?: number; // px
  size?: number; // icon size in px
  rounded?: string; // tailwind rounded class
}

const IconBox = ({
  icon: Icon,
  color = "#16a34a",
  bgColor = "#16a34a",
  bgOpacity = 0.12,
  width = 48,
  height = 48,
  size = 22,
  rounded = "rounded-full",
}: IconBoxProps) => {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center ${rounded}`}
      style={{ width, height }}
    >
      {/* transparent background layer */}
      <span
        className={`absolute inset-0 ${rounded}`}
        style={{ backgroundColor: bgColor, opacity: bgOpacity }}
      />
      {/* icon on top (stays fully solid) */}
      <Icon size={size} color={color} className="relative" />
    </div>
  );
};

export default IconBox;
