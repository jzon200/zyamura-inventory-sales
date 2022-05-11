import Image, { StaticImageData } from "next/image";

type Props = {
  label: string;
  quantity: number;
  imageData: StaticImageData;
  isSelected: boolean;
  onClick: () => void;
};

const CategoryItem = ({
  label,
  quantity,
  imageData,
  isSelected,
  onClick,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={`grid place-items-center w-36 p-2 select-none cursor-pointer rounded-3xl border-4 hover:border-blue-500 ${
        isSelected && "border-blue-500"
      }`}
    >
      <Image src={imageData} width={72} height={72} quality={100} />
      <div className="text-xs font-bold">{label}</div>
      <div className="text-xs">{`${quantity} Items`}</div>
    </div>
  );
};

export default CategoryItem;
