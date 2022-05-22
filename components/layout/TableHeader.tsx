type Props = {
  items: { label: string }[];
  className?: string;
};

const TableHeader = ({ items, className }: Props) => {
  return (
    <div
      className={`grid grid-cols-${items.length} gap-y-8 place-items-center  mt-16 text-[#919F88] text-xl uppercase ${className}`}
    >
      {/* Header */}
      {items.map((item, index) => (
        <div key={index} className="table-header">
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
