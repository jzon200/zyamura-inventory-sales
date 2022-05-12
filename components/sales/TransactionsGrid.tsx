import {
  collection,
  DocumentData,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { Fragment } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { db } from "../../lib/firebase";
import CircularProgressCentered from "../UI/CircularProgressCentered";

const TransactionsGrid = () => {
  const colRef = collection(db, "sales");
  const q = query(colRef, orderBy("dateAdded", "desc"));
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgressCentered />;

  const sales: Sales[] | DocumentData = snapshot!.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
    transactionDate: (doc.data().dateAdded as Timestamp).toDate(),
  }));

  return (
    <div className="overflow-y-auto h-96">
      <div className="mt-4 grid grid-cols-5 gap-y-8 text-xl place-items-center select-none text-[#3A512B]">
        {sales.map((item: Sales) => (
          <Fragment key={item.docId}>
            <div>{item.id}</div>
            <div>{`${item.purchasedItems[0].name}`}</div>
            <div>{item.author}</div>
            <div>₱{item.totalPrice.toLocaleString()}</div>
            <div>
              {item.transactionDate.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default TransactionsGrid;
