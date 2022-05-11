import Image from "next/image";

type Props = {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
};

const InventoryCard = ({ product, isSelected, onClick }: Props) => {
  const { id, name, description, imageUrl, category } = product;

  return (
    <div
      onClick={onClick}
      className={`w-96 rounded-xl p-4 grid grid-cols-3 border-2 cursor-pointer hover:border-green-500 ${
        isSelected && "border-green-500"
      }`}
    >
      {imageUrl ? (
        <div className="w-24">
          <Image
            className="rounded-lg mb-2"
            src={imageUrl}
            alt=""
            width={480}
            height={480}
            quality={100}
            objectFit="cover"
          />
        </div>
      ) : (
        <div className="w-24" />
      )}
      <div className="col-span-2">
        <div className="font-medium text-sm text-[gray]">#{id}</div>
        <div className="font-medium text-lg">{name}</div>
        <div className="rounded px-2 mb-2 bg-blue-500 text-white w-fit">
          {category}
        </div>
        <div className="text-[gray] text-sm max-h-14 text-ellipsis">
          {description}
          {description.length === 0 &&
            `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Recusandae non tenetur`}
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
