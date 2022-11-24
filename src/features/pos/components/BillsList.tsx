import CircularProgressCentered from "../../../common/components/CircularProgressCentered";
import { getPhpCurrency } from "../../../common/utils";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addSalesData } from "../store/actions";
import { clearTransactions } from "../store/reducer";
import { getTotalPrice } from "../utils";
import BillsItem from "./BillsItem";

export default function BillsList() {
  const { purchasedItems, isLoading } = useAppSelector((state) => ({
    purchasedItems: state.pos.purchasedItems,
    isLoading: state.pos.isLoading,
  }));

  const dispatch = useAppDispatch();

  const totalPrice = getTotalPrice(purchasedItems);

  function handleSubmitTransaction() {
    dispatch(addSalesData(purchasedItems));
  }

  return (
    <aside className="hidden lg:block">
      <div className="mt-1 text-4xl font-medium">Bills</div>
      <div className="my-4 px-4 h-[40rem] border overflow-y-auto">
        {purchasedItems.map((item) => (
          <BillsItem key={item.docId} product={item} />
        ))}
      </div>
      <div className="flex justify-between items-center w-full my-4 text-xl font-semibold">
        <div>Total</div>
        <div className="mr-4">{getPhpCurrency(totalPrice)}</div>
      </div>
      <div className="flex justify-between gap-16">
        <button
          onClick={() => dispatch(clearTransactions())}
          className="w-full rounded-2xl py-4 text-xl font-semibold outline outline-1 outline-blue-400 text-blue-500 hover:bg-blue-400/10"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitTransaction}
          className="w-full rounded-2xl py-4 text-xl font-semibold bg-blue-500 text-blue-50 hover:bg-blue-400"
        >
          {!isLoading ? (
            "Confirm"
          ) : (
            <CircularProgressCentered
              className="text-white"
              size={24}
              color="inherit"
            />
          )}
        </button>
      </div>
    </aside>
  );
}
