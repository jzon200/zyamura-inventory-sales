import Image from "next/image";
import { Fragment } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import imgPlaceholder from "../../../assets/image_placeholder.svg";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addBillsItem,
  removeBillsItem,
  setItemQuantity,
} from "../../../redux/slices/posSlice";

type Props = {
  product: Product;
};

const BillsItem = ({ product }: Props) => {
  const { id, name, category, imageUrl, price, quantity } = product;

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-24">
          <Image
            className="rounded-lg"
            src={imageUrl != null ? imageUrl : imgPlaceholder}
            width={480}
            height={480}
            objectFit="cover"
            alt=""
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
            <div className="flex gap-1 items-center">
              <button
                onClick={() => {
                  dispatch(
                    removeBillsItem({
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
                // ref={quantityRef}
                type="number"
                className="max-w-[48px] text-lg text-center focus:outline-blue-500"
                min={1}
                value={quantity}
                onBlur={() => {
                  if (quantity < 1) dispatch(removeBillsItem(product));
                  if (isNaN(quantity)) {
                    alert("Please enter a value!");
                  }
                }}
                onChange={(event) => {
                  const value = event.target.value;
                  dispatch(
                    setItemQuantity({
                      ...product,
                      quantity: parseInt(value),
                    })
                  );
                }}
              />
              <button
                onClick={() => {
                  dispatch(
                    addBillsItem({
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
              {isNaN(price)
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
