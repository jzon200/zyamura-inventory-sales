import { Fragment } from "react";

import CircularProgressCentered from "../../../common/components/CircularProgressCentered";
import { addSalesData } from "../../../redux/actions/posActions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearTransactions } from "../../../redux/slices/posSlice";
import BillsItem from "./BillsItem";

export default function BillsList() {
  const { purchasedItems, isLoading } = useAppSelector((state) => ({
    purchasedItems: state.pos.purchasedItems,
    isLoading: state.ui.showLoadingSpinner,
  }));
  const dispatch = useAppDispatch();

  const totalPrice = purchasedItems
    .map((item) => item.price)
    .reduce((previousValue, currentValue) => {
      if (isNaN(currentValue)) {
        return previousValue;
      }
      return previousValue + currentValue;
    }, 0);

  const submitTransactionHandler = () => {
    dispatch(addSalesData(purchasedItems));
  };

  return (
    <Fragment>
      <div className="mt-1 text-4xl font-medium">Bills</div>
      <div className="my-4 px-4 h-[40rem] border overflow-y-auto">
        {purchasedItems.map((item) => (
          <BillsItem key={item.docId} product={item} />
        ))}
      </div>
      <div className="flex justify-between items-center w-full my-4 text-xl font-semibold">
        <div>Total</div>
        <div className="mr-4">
          ₱{totalPrice.toLocaleString("en-PH", { maximumFractionDigits: 2 })}
        </div>
      </div>
      <div className="flex justify-between gap-16">
        <button
          onClick={() => dispatch(clearTransactions())}
          className="w-full rounded-2xl py-4 text-xl font-semibold outline outline-1 outline-blue-400 text-blue-500  hover:bg-blue-400/10"
        >
          Cancel
        </button>
        <button
          onClick={submitTransactionHandler}
          className="w-full rounded-2xl py-4 text-xl font-semibold bg-blue-500 text-blue-50 hover:bg-blue-400"
        >
          {!isLoading ? (
            "Confirm"
          ) : (
            <CircularProgressCentered
              className="text-white"
              size={32}
              color="inherit"
            />
          )}
        </button>
      </div>
    </Fragment>
  );
}
