import Image from "next/image";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="w-40 rounded-lg border-2 border-[#CBD5E1] bg-[#D5DCE3] drop-shadow-md p-2 cursor-pointer">
      <div className="font-medium mb-2">{product.name}</div>
      <div className="w-fit rounded-md px-2 py-1 bg-[#0EA5E9] text-white text-xs mb-2">
        {product.category}
      </div>
      <div className="grid place-items-center">
        {product.imageUrl ? (
          <div className="w-24">
            <Image
              className="rounded-lg mb-2"
              src={product.imageUrl}
              alt=""
              width={480}
              height={480}
              quality={100}
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="w-24"></div>
        )}
        <div className="text-lg">
          {`₱${product.price.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
