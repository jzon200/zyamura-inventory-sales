import Image from "next/image";

type Props = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
};

const BillsItem = ({ id, name, category, imageUrl, price }: Props) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-24">
        <Image
          className="rounded-lg"
          src={imageUrl}
          width={480}
          height={480}
          quality={100}
          objectFit="cover"
        />
      </div>
      <div className="grow">
        <div className="text-lg font-medium">
          {name} <span className="text-xs text-gray-500">#{id}</span>
        </div>
        <div className="rounded-md px-2 py-1 bg-blue-500 text-blue-50 w-fit">
          {category}
        </div>
        <div className="mt-4 flex justify-between items-center text-lg font-medium">
          <div>x1</div>
          <div>
            ₱{price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillsItem;
