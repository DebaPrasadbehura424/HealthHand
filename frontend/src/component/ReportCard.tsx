import type { IconType } from "react-icons";
import { FiDownload } from "react-icons/fi";
import IconBox from "./IconBox";

interface ReportCardProps {
  icon: IconType;
  color: string;
  title: string;
  date: string;
  completed: boolean;
  onView?: () => void;
  onDownload?: () => void;
}

const ReportCard = ({
  icon,
  color,
  title,
  date,
  completed,
  onView,
  onDownload,
}: ReportCardProps) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <IconBox
        icon={icon}
        color={color}
        bgColor={color}
        width={44}
        height={44}
        size={20}
        rounded="rounded-lg"
      />

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="mt-0.5 text-[11px] text-gray-500">{date}</p>

        {completed ? (
          <button
            onClick={onView}
            className="mt-2 text-xs font-medium text-green-700"
          >
            View Report
          </button>
        ) : (
          <span className="mt-2 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-medium text-amber-600">
            Report will be ready soon
          </span>
        )}
      </div>

      {completed && (
        <button onClick={onDownload} className="p-1 text-green-700">
          <FiDownload size={18} />
        </button>
      )}
    </div>
  );
};

export default ReportCard;
