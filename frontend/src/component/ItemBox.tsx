import type { IconType } from "react-icons";
import { FiChevronRight } from "react-icons/fi";
import IconBox from "./IconBox";

interface ItemBoxProps {
  icon: IconType;
  color: string;
  title: string;
  subtitle: string;
  price: number;
  clinicName?: string;
  clinicType?: "Clinic" | "Hospital";
  isVerified?: boolean;
  onClick?: () => void;
}

const ItemBox = ({
  icon,
  color,
  title,
  subtitle,
  price,
  clinicName,
  clinicType,
  isVerified,
  onClick,
}: ItemBoxProps) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
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

        {clinicName && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-gray-700">
              {clinicName}
            </span>

            {/* Hospital or Clinic */}
            {clinicType && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                {clinicType}
              </span>
            )}

            {/* Verified: red button, Not verified: green button */}
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${
                isVerified ? "bg-red-500" : "bg-green-600"
              }`}
            >
              {isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        )}

        <p className="mt-1 text-xs font-semibold text-gray-900">₹{price}</p>
      </div>

      <FiChevronRight size={18} className="text-gray-400" />
    </div>
  );
};

export default ItemBox;
