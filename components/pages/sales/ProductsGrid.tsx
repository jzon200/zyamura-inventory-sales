import {
  addDoc,
  collection,
  DocumentData,
  orderBy,
  query,
} from "firebase/firestore";
import { Fragment, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAppDispatch } from "../../../redux/hooks";
import { db } from "../../../services/firebase";
import CircularProgressCentered from "../../common/CircularProgressCentered";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const collectionRef = collection(db, "products");
  const q = query(collectionRef, orderBy("dateAdded", "desc"));
  const [snapshot, loading] = useCollection(q);
  const dispatch = useAppDispatch();

  if (loading)
    return (
      <div className="h-96">
        <CircularProgressCentered />
      </div>
    );

  const products: Product[] | DocumentData = snapshot!.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });

  console.log(selectedItems);

  return (
    <Fragment>
      <div className="grid grid-cols-5 gap-x-1 gap-y-5 mb-4 h-[28rem] overflow-x-hidden overflow-y-scroll">
        {products.map((product: Product) => {
          return (
            <ProductCard
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
                    return prevItems.filter(
                      (item) => product.docId !== item.docId
                    );
                  }
                  // otherwise it will add to the selectedItems state
                  return [...prevItems, product];
                })
              }
            />
          );
        })}
      </div>
      <button
        onClick={async () => {
          const colRef = collection(db, "sales");
          const id = Math.floor(Math.random() * 1000000);

          await addDoc(colRef, {
            id,
            selectedItems,
          });
          // dispatch(setShowAddDialog(false));
        }}
        className="btn-primary block ml-auto"
      >
        Submit
      </button>
    </Fragment>
  );
};

export default ProductsGrid;
