import Image from "next/image";
import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import imgPlaceholder from "../../assets/image_placeholder.svg";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { addBillsItem } from "../../redux-store/slices/posSlice";

type Props = {
  product: Product;
};

const InventoryCard = ({ product }: Props) => {
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

  const incrementCountHandler = () => {
    setCount((prevState) => {
      // If the input is empty, state is set to 1
      if (!prevState) {
        return 1;
      }

      // The state will be only added if it is lesser
      // to the total quantity of product
      if (prevState < quantity) {
        return prevState + 1;
      }

      return prevState;
    });
  };

  const addItemHandler = () => {
    // Validation on adding items
    if (!count) {
      alert("Please input the amount you want to add");
      return;
    }

    if (count < 1) {
      alert("Please input a correct amount");
      return;
    }

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
  };

  const decrementCountHandler = () => {
    setCount((value) => (value > 1 ? value - 1 : value));
  };

  return (
    <div
      className={`w-96 rounded-xl p-4 grid grid-cols-3 border border-zinc-300 shadow-zinc-400/80 shadow-md`}
    >
      <div>
        <div className="w-24">
          <Image
            className="rounded-lg mb-2"
            src={!imageUrl ? imgPlaceholder : imageUrl}
            alt=""
            width={480}
            height={480}
            objectFit="cover"
          />
        </div>
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
          {/* <span
            className={`inline-block px-2 py-[2px] rounded-full ${
              itemType === "individual"
                ? "bg-[#C9EBEC] text-[#558DAB]"
                : "bg-[#EFE0C1] text-[#B7995D]"
            }`}
          >
            {itemType}
          </span> */}
        </div>
        <div className="text-[gray] text-sm max-h-14 text-ellipsis">
          {description?.substring(0, 95)}
          {description?.length === 0 &&
            `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Recusandae non tenetur`}
        </div>
      </div>

      <div className="flex gap-1 items-center">
        <button onClick={decrementCountHandler}>
          <MdRemove size={20} />
        </button>
        <input
          type="number"
          className="max-w-[48px] text-lg text-center focus:outline-blue-500"
          min={1}
          max={quantity}
          value={!count ? "" : count}
          onKeyDown={(event) => {
            const disabledKeys = ["e", "E", "+", "-", "."];
            disabledKeys.includes(event.key) && event.preventDefault();
          }}
          onChange={(event) => {
            const newValue = parseInt(event.target.value);
            setCount(newValue);
          }}
        />
        <button onClick={incrementCountHandler}>
          <MdAdd size={20} />
        </button>
      </div>
      <div className="place-self-center text-lg font-medium">
        {price.toLocaleString("en-PH", {
          currency: "PHP",
          style: "currency",
          maximumFractionDigits: 0,
        })}
      </div>
      <button
        onClick={addItemHandler}
        className="w-16 px-2 py-1 rounded bg-blue-500 text-blue-50 font-medium place-self-end hover:shadow-blue-300 hover:shadow-md"
      >
        Add
      </button>
    </div>
  );
};

export default InventoryCard;
