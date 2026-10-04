interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

const SectionHeader = ({ title, onSeeAll }: SectionHeaderProps) => {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="text-xs font-medium text-green-700"
        >
          See All
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
