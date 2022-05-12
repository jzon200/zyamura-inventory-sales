import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  addAllItemsHandler,
  addItemHandler,
} from "../../redux-store/slices/posSlice";
import InventoryCard from "./InventoryCard";

const InventoryGrid = () => {
  const collectionRef = collection(db, "products");
  const latestProducts = query(collectionRef, orderBy("dateAdded", "desc"));
  // const q = query(collectionRef, where("category", "==", "fish"));

  const { products, purchasedItems } = useAppSelector((state) => ({
    products: state.pos.items,
    purchasedItems: state.pos.purchasedItems,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDocs(latestProducts);
      const products: Product[] | DocumentData = docSnap.docs.map((doc) => {
        return {
          ...doc.data(),
          docId: doc.id,
        };
      });

      dispatch(addAllItemsHandler(products as Product[]));
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product: Product) => (
        <InventoryCard
          key={product.docId}
          product={product}
          // isSelected={selectedItems.some(
          //   (item) => product.docId === item.docId
          // )}
          // onClick={() => dispatch(addItemHandler(product))}
        />
      ))}
    </div>
  );
};

export default InventoryGrid;
