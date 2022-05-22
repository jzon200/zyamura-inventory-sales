import {
  collection,
  DocumentData,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { Fragment } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import { useAppSelector } from "../../redux-store/hooks/hooks";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import ProductsRowData from "./ProductsRowData";

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

  return (
    <Fragment>
      <div className="overflow-y-scroll py-8 h-4/5">
        <div className="grid grid-cols-8 gap-y-8 place-items-center  text-[#3A512B] text-xl">
          {products.map((product: Product) => (
            <ProductsRowData key={product.docId} product={product} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsTable;
