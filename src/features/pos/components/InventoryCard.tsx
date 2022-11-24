import { ChangeEvent, useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";

import { CustomImage } from "../../../common/components";
import { getPhpCurrency, handleNumberKeys } from "../../../common/utils";
import { useAppDispatch } from "../../../redux/hooks";
import { addBillsItem } from "../store/reducer";

type Props = {
  product: Product;
};

export default function InventoryCard({ product }: Props) {
  const initialCount = 1;
  const [count, setCount] = useState(initialCount);
  const dispatch = useAppDispatch();

  const {
    id,
    name,
    description,
    imageUrl,
    category,
    price,
    quantity,
    itemType,
  } = product;

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    setCount((c) => (c > 1 ? c - 1 : c));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(event.target.value);
    setCount(newValue);
  }

  function handleBlur() {
    if (isNaN(count) || count < 1) {
      setCount(initialCount);
    }
  }

  function handleAddItem() {
    // Validation on adding items
    if (count > quantity) {
      alert("You've reached the maximum quantity available for this item!");
      return;
    }

    dispatch(
      addBillsItem({
        ...product,
        quantity: count,
        price: price * count,
      })
    );
    setCount(initialCount);
  }

  return (
    <div className="w-full rounded-xl p-4 grid grid-cols-3 border border-zinc-300 shadow-md lg:shadow-none shadow-gray-400/70">
      <div>
        <CustomImage imageUrl={imageUrl} />
        <div>
          In stock:{" "}
          <span className="font-medium">{quantity.toLocaleString()}</span>
        </div>
      </div>
      <div className="col-span-2 font-medium">
        <div className="text-lg">
          {name}
          <span className="ml-2 text-sm text-[gray]">#{id}</span>
        </div>
        <div className="mb-2">
          <span className="inline-block rounded px-2 mr-1 bg-blue-500 text-white">
            {category}
          </span>
        </div>
        <div className="text-[gray] text-sm max-h-14 text-ellipsis">
          {description?.substring(0, 35)}
          {description?.length === 0 &&
            `Lorem, ipsum dolor sit amet consectetur adipisicing.`}
        </div>
      </div>

      <div className="flex gap-1 items-center">
        <button onClick={handleDecrement}>
          <MdRemove size={20} />
        </button>
        <input
          type="number"
          className="max-w-[48px] text-lg text-center focus:outline-blue-500"
          min={1}
          max={quantity}
          value={count}
          onBlur={handleBlur}
          onKeyDown={handleNumberKeys}
          onChange={handleChange}
        />
        <button onClick={handleIncrement}>
          <MdAdd size={20} />
        </button>
      </div>
      <div className="place-self-center text-lg font-medium">
        {getPhpCurrency(price)}
      </div>
      <button
        onClick={handleAddItem}
        className="w-16 px-2 py-1 rounded bg-blue-500 text-blue-50 font-medium place-self-end
         hover:shadow-blue-300 hover:shadow-md"
      >
        Add
      </button>
    </div>
  );
}
