import type { IconType } from "react-icons";
import { FiChevronRight } from "react-icons/fi";
import IconBox from "./IconBox";

interface ItemBoxProps {
  icon: IconType;
  color: string;
  title: string;
  subtitle: string;
  price: number;
  onClick?: () => void;
}

const ItemBox = ({
  icon,
  color,
  title,
  subtitle,
  price,
  onClick,
}: ItemBoxProps) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-gray-300 bg-white p-3 shadow-sm"
    >
      <IconBox
        icon={icon}
        color={color}
        bgColor={color}
        width={44}
        height={44}
        size={20}
      />

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="mt-0.5 text-[11px] text-gray-500">{subtitle}</p>
        <p className="mt-0.5 text-xs font-semibold text-gray-900">₹{price}</p>
      </div>

      <FiChevronRight size={18} className="text-gray-400" />
    </div>
  );
};

export default ItemBox;
