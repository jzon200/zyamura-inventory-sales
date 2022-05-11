import { collection, DocumentData, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import InventoryCard from "./InventoryCard";

const InventoryGrid = () => {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const collectionRef = collection(db, "products");
  const q = query(collectionRef, orderBy("dateAdded", "desc"));
  const [snapshot, loading] = useCollection(q);

  if (loading)
    return (
      <div className="h-[48rem]">
        <CircularProgressCentered />
      </div>
    );

  const products: Product[] | DocumentData = snapshot!.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });

  return (
    <div className="grid grid-cols-3 gap-5">
      {products.map((product: Product) => (
        <InventoryCard
          key={product.docId}
          product={product}
          isSelected={selectedItems.some(
            (item) => product.docId === item.docId
          )}
          onClick={() =>
            setSelectedItems((prevItems) => {
              // if the previous state of array contains the existing product,
              // then it will be removed from the array without mutating the state
              if (prevItems.some((item) => product.docId === item.docId)) {
                return prevItems.filter((item) => product.docId !== item.docId);
              }
              // otherwise it will add to the selectedItems state
              return [...prevItems, product];
            })
          }
        />
      ))}
    </div>
  );
};

export default InventoryGrid;
