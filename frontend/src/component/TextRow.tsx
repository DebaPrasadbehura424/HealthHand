import type { IconType } from "react-icons";
import IconBox from "./IconBox";

interface TestRowProps {
  icon: IconType;
  color: string;
  title: string;
  price: number;
  onClick?: () => void;
}

const TestRow = ({ icon, color, title, price, onClick }: TestRowProps) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm"
    >
      <IconBox
        icon={icon}
        color={color}
        bgColor={color}
        width={32}
        height={32}
        size={14}
        rounded="rounded-lg"
      />
      <p className="flex-1 text-xs font-medium text-gray-800">{title}</p>
      <p className="text-xs font-semibold text-gray-900">₹{price}</p>
    </div>
  );
};

export default TestRow;
