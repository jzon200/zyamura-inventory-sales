import {
  collection,
  DocumentData,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { addItems } from "../../redux-store/slices/posSlice";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import InventoryCard from "./InventoryCard";

const InventoryGrid = () => {
  // const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const collectionRef = collection(db, "products");
  const q = query(collectionRef, orderBy("dateAdded", "desc"));
  // const q = query(collectionRef, where("category", "==", "fish"));

  const [snapshot, loading] = useCollection(q);

  const selectedItems = useAppSelector((state) => state.pos.selectedItems);
  const dispatch = useAppDispatch();

  console.log(selectedItems);

  if (loading)
    return (
      <div className="h-[48rem] min-w-[74rem]">
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
    <div className="grid grid-cols-3 gap-4">
      {products.map((product: Product) => (
        <InventoryCard
          key={product.docId}
          product={product}
          isSelected={selectedItems.some(
            (item) => product.docId === item.docId
          )}
          onClick={() => dispatch(addItems(product))}
        />
      ))}
    </div>
  );
};

export default InventoryGrid;
