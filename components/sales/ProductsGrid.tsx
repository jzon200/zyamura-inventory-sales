import { collection, DocumentData, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  const collectionRef = collection(db, "products");
  const q = query(collectionRef, orderBy("dateAdded", "desc"));
  const [snapshot, loading] = useCollection(q);

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

  return (
    <div className="grid grid-rows-2 grid-cols-5 gap-x-9 gap-y-5 mb-4">
      {products.map((product: Product) => (
        <ProductCard key={product.docId} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
