import { collection, DocumentData, orderBy, query } from "firebase/firestore";
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
      productQuery.queryConstraint,
      productQuery.descending ? "desc" : "asc"
    )
  );
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgressCentered />;

  const products: Product[] | DocumentData = snapshot!.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });

  return (
    <Fragment>
      {/* <TableHeader /> */}
      <div className="overflow-y-scroll py-8 h-5/6">
        <div className="grid grid-cols-7 gap-y-8 place-items-center select-none text-[#3A512B] text-xl">
          {products.map((product: Product) => (
            <ProductsRowData key={product.docId} product={product} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsTable;
