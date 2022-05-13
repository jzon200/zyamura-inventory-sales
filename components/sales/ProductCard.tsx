import Image from "next/image";
import { useState } from "react";

type Props = {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
};

const ProductCard = ({ product, isSelected, onClick }: Props) => {
  const { id, name, category, imageUrl, price } = product;

  return (
    <div
      onClick={onClick}
      className={`w-40 rounded-lg border-2 border-[#CBD5E1] bg-[#D5DCE3] drop-shadow-md p-2 cursor-pointer ${
        isSelected && "bg-[#A4E987]"
      }`}
    >
      <div className="font-medium mb-2">{`${name}`}</div>
      <div className="w-fit rounded-md px-2 py-1 bg-[#0EA5E9] text-white text-xs mb-2">
        {category}
      </div>
      <div className="grid place-items-center">
        {imageUrl ? (
          <div className="w-24">
            <Image
              className="rounded-lg mb-2"
              src={imageUrl}
              alt=""
              width={480}
              height={480}
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="w-24"></div>
        )}
        <div className="text-lg">
          {`₱${price.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
