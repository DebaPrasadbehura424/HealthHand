interface FilterBoxProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const FilterBox = ({ label, active = false, onClick }: FilterBoxProps) => {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium ${
        active
          ? "border-green-700 bg-green-700 text-white"
          : "border-gray-200 bg-white text-gray-600"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterBox;
