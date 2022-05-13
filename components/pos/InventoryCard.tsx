import Image from "next/image";
import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { addItemHandler } from "../../redux-store/slices/posSlice";

type Props = {
  product: Product;
  // isSelected: boolean;
  // onClick: () => void;
};

const InventoryCard = ({ product }: Props) => {
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();
  const { id, name, description, imageUrl, category, price, quantity } =
    product;

  return (
    <div
      className={`w-96 rounded-xl p-4 grid grid-cols-3 border-2 border-blue-50`}
    >
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
          <div>
            In stock:{" "}
            <span className="text-[#B7995D]">{quantity.toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <div className="w-24" />
      )}
      <div className="col-span-2 font-medium">
        <div className="text-lg">
          {name}
          <span className="ml-2 text-sm text-[gray]">#{id}</span>
        </div>
        <div className="rounded px-2 mb-2 bg-blue-500 text-white w-fit">
          {category}
        </div>
        <div className="text-[gray] text-sm max-h-14 text-ellipsis">
          {description.substring(0, 95)}
          {description.length === 0 &&
            `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Recusandae non tenetur`}
        </div>
      </div>

      <div className="flex gap-1 items-center">
        <button
          onClick={() => setCount((value) => (value > 1 ? value - 1 : value))}
        >
          <MdRemove size={20} />
        </button>
        <input
          type="number"
          className="max-w-[48px] text-lg text-center focus:outline-blue-500"
          min={1}
          max={quantity}
          value={count}
          onChange={(event) => {
            const value = parseInt(event.target.value);
            setCount(value);
          }}
        />
        <button
          onClick={() =>
            setCount((state) => (state < quantity ? state + 1 : state))
          }
        >
          <MdAdd size={20} />
        </button>
      </div>
      <div className="text-lg font-medium">
        ₱{price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
      <button
        onClick={() => {
          // Validation on adding items
          if (count > quantity) {
            alert(
              "You've reached the maximum quantity available for this item!"
            );
            return;
          }

          dispatch(
            addItemHandler({
              ...product,
              quantity: count,
              price: price * count,
            })
          );
          setCount(1);
        }}
        className="w-16 px-2 py-1 rounded bg-blue-500 text-blue-50 font-medium place-self-end"
      >
        Add
      </button>
    </div>
  );
};

export default InventoryCard;
