import { collection, orderBy, query } from "firebase/firestore";
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
  const [snapshot, loading, error] = useCollection(q);

  if (loading) return <CircularProgressCentered className="h-full" />;

  const products: Product[] = snapshot!.docs.map((doc) => {
    const {
      id,
      name,
      price,
      month,
      quantity,
      year,
      category,
      itemType,
      description,
      imageUrl,
      dateAdded,
    } = doc.data();
    return {
      id,
      docId: doc.id,
      name,
      description,
      category,
      price,
      itemType,
      year,
      month,
      quantity,
      imageUrl,
      dateAdded,
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

// const TableHeader: FC = () => {
//   return (
//     <TableGrid className="mt-16 text-[#3A512B] text-xl">
//       {/* Header */}
//       <div>{/* Empty Column */}</div>
//       <div className="table-header">ID</div>
//       <div className="table-header">NAME</div>
//       <div className="table-header">CATEGORY</div>
//       <div className="table-header">QUANTITY</div>
//       <div className="table-header">PRICE</div>
//       <div className="table-header">ACTION</div>
//       {/* Items */}
//     </TableGrid>
//   );
// };

export default ProductsTable;
