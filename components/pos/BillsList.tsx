import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Fragment, useState } from "react";
import { db } from "../../lib/firebase";
import { useAppSelector } from "../../redux-store/hooks/hooks";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import BillsItem from "./BillsItem";

const BillsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { purchasedItems, totalPrice } = useAppSelector((state) => ({
    purchasedItems: state.pos.purchasedItems,
    totalPrice: state.pos.totalPrice,
  }));

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
      <button
        onClick={async () => {
          setIsLoading(true);
          const id = Math.floor(Math.random() * 1000000);
          await addDoc(collection(db, "sales"), {
            id,
            purchasedItems,
            totalPrice,
            author: "Admin",
            dateAdded: serverTimestamp(),
          });
          // updateDoc()
          setIsLoading(false);
        }}
        className="w-full rounded-2xl py-6 text-2xl font-semibold
             bg-blue-500 text-blue-50 hover:bg-blue-400"
      >
        {!isLoading && "Submit"}
        {isLoading && (
          <CircularProgressCentered className="text-white" size={32} />
        )}
      </button>
    </Fragment>
  );
};

export default BillsList;
