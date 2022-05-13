import Image from "next/image";
import { Fragment } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  addItemHandler,
  removeItemHandler,
  replaceItemQuantity,
} from "../../redux-store/slices/posSlice";

type Props = {
  product: Product;
};

const BillsItem = ({ product }: Props) => {
  const { id, name, category, imageUrl, price, quantity } = product;

  // const { products, purchasedItems } = useAppSelector((state) => ({
  //   products: state.pos.items,
  //   purchasedItems: state.pos.purchasedItems,
  // }));

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-24">
          <Image
            className="rounded-lg"
            src={imageUrl!}
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
            {/* <div>x{!quantity ? 0 : quantity}</div> */}
            <div className="flex gap-1 items-center">
              <button
                onClick={() => {
                  dispatch(
                    removeItemHandler({
                      ...product,
                      quantity: 1,
                      price: price / quantity,
                    })
                  );
                }}
              >
                <MdRemove size={20} />
              </button>
              <input
                type="number"
                className="max-w-[48px] text-lg text-center focus:outline-blue-500"
                min={1}
                value={quantity}
                onBlur={() => {
                  if (quantity === 0) dispatch(removeItemHandler(product));
                }}
                onChange={(event) => {
                  const value = event.target.value;
                  // if (!value) {
                  //   return;
                  // }
                  dispatch(
                    replaceItemQuantity({
                      ...product,
                      quantity: parseInt(value),
                    })
                  );
                  // setCount(value);
                }}
              />
              <button
                onClick={() => {
                  dispatch(
                    addItemHandler({
                      ...product,
                      quantity: 1,
                      price: price / quantity,
                    })
                  );
                }}
              >
                <MdAdd size={20} />
              </button>
            </div>
            <div>
              ₱
              {!price
                ? 0
                : price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BillsItem;
