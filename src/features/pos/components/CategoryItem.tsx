import Image from "next/image";

type Props = {
  label: string;
  quantity: number;
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function CategoryItem({
  label,
  quantity,
  imageUrl,
  isSelected,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`grid place-items-center w-20 lg:w-36 p-2 cursor-pointer rounded-3xl border-2 hover:border-blue-500 ${
        isSelected && "border-blue-500"
      }`}
    >
      <div className="w-12 lg:w-16">
        <Image
          src={imageUrl}
          width={72}
          height={72}
          alt=""
          layout="responsive"
        />
      </div>
      <div className="hidden lg:block text-xs font-medium">{label}</div>
      <div
        className={"hidden lg:block text-xs text-slate-400"}
      >{`${quantity} Items`}</div>
    </div>
  );
}
