import type { IconType } from "react-icons";
import { FiHome, FiMapPin } from "react-icons/fi";
import IconBox from "./IconBox";

interface BookingCardProps {
  icon: IconType;
  color: string;
  title: string;
  clinic: string;
  date: string;
  status: string;
  statusColor: string;
  collectionType: "Home Collection" | "Visit Lab";
}

const BookingCard = ({
  icon,
  color,
  title,
  clinic,
  date,
  status,
  statusColor,
  collectionType,
}: BookingCardProps) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex items-start gap-3">
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
          {/* <p className="mt-0.5 text-[11px] text-gray-500">{clinic}</p> */}
          <p className="mt-0.5 text-[11px] text-gray-500">
            {date.split("T")[0]}
          </p>
        </div>

        {/* Status badge: text color + transparent background */}
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
          style={{ color: statusColor, backgroundColor: `${statusColor}1f` }}
        >
          {status}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5 border-t border-gray-100 pt-2 text-[11px] text-gray-500">
        {collectionType === "Home Collection" ? (
          <FiHome size={13} />
        ) : (
          <FiMapPin size={13} />
        )}
        {collectionType}
      </div>
    </div>
  );
};

export default BookingCard;
