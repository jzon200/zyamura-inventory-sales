import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  addSalesData,
  clearTransactions,
} from "../../redux-store/slices/posSlice";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import BillsItem from "./BillsItem";

const BillsList = () => {
  const { posState, isLoading } = useAppSelector((state) => ({
    posState: state.pos,
    isLoading: state.ui.isLoading,
  }));
  const dispatch = useAppDispatch();

  const { purchasedItems, totalPrice } = posState;

  const submitTransactionHandler = () => {
    dispatch(addSalesData(posState));
  };

  return (
    <Fragment>
      <div className="mt-1 text-4xl font-medium">Bills</div>
      <div className="my-4 px-4 h-[38rem] overflow-y-auto">
        {purchasedItems.map((item) => (
          <BillsItem key={item.id} product={item} />
        ))}
      </div>
      <div className="bottom-0 flex justify-between items-center w-full mt-12 mb-4 text-xl font-semibold">
        <div>Total</div>
        <div className="mr-4">
          ₱{totalPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* TODO: Fix the Logic for bringing back the initial state */}
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
