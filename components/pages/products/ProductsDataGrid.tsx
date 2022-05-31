import { collection, DocumentData, query, Timestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../services/firebase";
import { useAppSelector } from "../../../redux/hooks";
import CircularProgressCentered from "../../common/CircularProgressCentered";
import DataGrid from "../../data-grid/DataGrid";

const TABLE_HEADERS = {
  imageUrl: "",
  id: "Product ID",
  name: "Name",
  category: "Category",
  quantity: "Quantity",
  cost: "Product Cost",
  price: "Selling Price",
  status: "Status",
};

const ProductsDataGrid = () => {
  const sortQuery = useAppSelector((state) => state.firestore.sortQuery);

  const collectionRef = collection(db, "products");
  const q = query(collectionRef, sortQuery);
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

  return <DataGrid headers={TABLE_HEADERS} rowData={products} />;
};

export default ProductsDataGrid;
