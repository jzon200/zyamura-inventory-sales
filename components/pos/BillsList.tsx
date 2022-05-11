import { Fragment } from "react";
import { useAppSelector } from "../../redux-store/hooks/hooks";
import BillsItem from "./BillsItem";

const BillsList = () => {
  const { selectedItems, totalPrice } = useAppSelector((state) => ({
    selectedItems: state.pos.selectedItems,
    totalPrice: state.pos.totalPrice,
  }));

  return (
    <Fragment>
      <div className="mt-1 text-4xl font-medium">Bills</div>
      <div className="my-4 px-4 h-[38rem] overflow-y-auto">
        {selectedItems.map((item) => (
          <BillsItem
            key={item.docId}
            id={item.id}
            name={item.name}
            category={item.category}
            price={item.price}
            imageUrl={item.imageUrl!}
          />
        ))}
      </div>
      <div className="bottom-0 flex justify-between items-center w-full mt-12 mb-4 text-xl font-semibold">
        <div>Total</div>
        <div className="mr-4">
          ₱{totalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
      </div>
      <button
        className="w-full rounded-2xl py-6 text-2xl font-semibold
             bg-blue-500 text-blue-50 hover:bg-blue-400"
      >
        Submit
      </button>
    </Fragment>
  );
};

export default BillsList;
