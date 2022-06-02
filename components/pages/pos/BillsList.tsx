import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addSalesData,
  clearTransactions,
} from "../../../redux/slices/posSlice";
import CircularProgressCentered from "../../common/CircularProgressCentered";
import BillsItem from "./BillsItem";

const BillsList = () => {
  const { purchasedItems, isLoading } = useAppSelector((state) => ({
    purchasedItems: state.pos.purchasedItems,
    isLoading: state.ui.showLoadingSpinner,
  }));
  const dispatch = useAppDispatch();

  const submitTransactionHandler = () => {
    dispatch(addSalesData(purchasedItems));
  };

  const totalPrice = purchasedItems
    .map((item) => item.price)
    .reduce((previousValue, currentValue) => {
      if (isNaN(currentValue)) {
        return previousValue + 0;
      }
      return previousValue + currentValue;
    }, 0);

  return (
    <Fragment>
      <div className="mt-1 text-4xl font-medium">Bills</div>
      <div className="my-4 px-4 h-[38rem] overflow-y-auto">
        {purchasedItems.map((item) => (
          <BillsItem key={item.docId} product={item} />
        ))}
      </div>
      <div className="bottom-0 flex justify-between items-center w-full mt-12 mb-4 text-2xl font-semibold">
        <div>Total</div>
        <div className="mr-4">
          ₱{totalPrice.toLocaleString("en-PH", { maximumFractionDigits: 2 })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => dispatch(clearTransactions())}
          className="w-full rounded-2xl py-6 text-2xl font-semibold border border-blue-400 text-blue-500  hover:border-blue-500"
        >
          Cancel
        </button>
        <button
          onClick={submitTransactionHandler}
          className="w-full rounded-2xl py-6 text-2xl font-semibold bg-blue-500 text-blue-50 hover:bg-blue-400"
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
};

export default BillsList;
