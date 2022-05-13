import {
  addDoc,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { Fragment, useState } from "react";
import { db } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { clearTransactions } from "../../redux-store/slices/posSlice";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import BillsItem from "./BillsItem";

const BillsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { purchasedItems, totalPrice } = useAppSelector((state) => ({
    purchasedItems: state.pos.purchasedItems,
    totalPrice: state.pos.totalPrice,
  }));

  const dispatch = useAppDispatch();

  const submitTransactionHandler = async () => {
    setIsLoading(true);
    const id = Math.floor(Math.random() * 1000000);

    // Decrease the quantity of products inventory
    // for every purchased items using Firestore Transaction
    for (const item of purchasedItems) {
      try {
        await runTransaction(db, async (transaction) => {
          const sfDocRef = doc(db, "products", item.docId);
          const sfDoc = await transaction.get(sfDocRef);
          if (!sfDoc.exists()) {
            throw "Document does not exist!";
          }

          const newQuantity = sfDoc.data().quantity - item.quantity;
          // Remove the existing item in the products inventory
          if (newQuantity === 0) {
            transaction.delete(sfDocRef);
          } else {
            transaction.update(sfDocRef, { quantity: newQuantity });
          }
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
    }

    await addDoc(collection(db, "sales"), {
      id,
      purchasedItems,
      totalPrice,
      author: "Admin",
      dateAdded: serverTimestamp(),
    });

    setIsLoading(false);
    dispatch(clearTransactions());
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
      <button
        onClick={submitTransactionHandler}
        className="w-full rounded-2xl py-6 text-2xl font-semibold bg-blue-500 text-blue-50 shadow-gray-400 shadow-md hover:bg-blue-400"
      >
        {!isLoading && "Submit"}
        {isLoading && (
          <CircularProgressCentered
            className="text-white"
            size={32}
            color="inherit"
          />
        )}
      </button>
    </Fragment>
  );
};

export default BillsList;
