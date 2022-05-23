import {
  collection,
  DocumentData,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import { useAppSelector } from "../../redux-store/hooks/hooks";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import Table from "../UI/Table";

const TABLE_HEADERS = {
  id: "Product ID",
  category: "Category",
  quantity: "Quantity",
  cost: "Cost",
  price: "Price",
};

const ProductsTable = () => {
  const productQuery = useAppSelector((state) => state.products.productQuery);
  const collectionRef = collection(db, "products");
  const q = query(
    collectionRef,
    orderBy(
      productQuery.queryConstraint!,
      productQuery.descending ? "desc" : "asc"
    )
  );
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgressCentered />;

  const products: Product[] | DocumentData = snapshot!.docs.map((doc) => {
    const dateAdded = doc.data().dateAdded as Timestamp;
    const dateModified = doc.data().dateModified as Timestamp;

    return {
      ...doc.data(),
      docId: doc.id,
      // To avoid non-serializable state in Redux
      dateAdded: dateAdded
        ? dateAdded.toDate().toLocaleDateString()
        : dateAdded,
      dateModified: dateModified
        ? dateModified.toDate().toLocaleDateString()
        : dateModified,
    };
  });

  return <Table headers={TABLE_HEADERS} cellsData={products} containsImage />;
};

export default ProductsTable;
