import { collection, DocumentData, query, Timestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import CircularProgressCentered from "../../../common/components/CircularProgressCentered";
import { db } from "../../../firebase";
import { useAppSelector } from "../../../redux/hooks";
import { DataGrid } from "../components";

const TABLE_HEADERS = {
  id: "Transaction ID",
  totalPrice: "Total Sales",
  author: "Added by",
  dateAdded: "Transaction Date",
};

const SalesDataGrid = () => {
  const sortQuery = useAppSelector((state) => state.firestore.sortQuery);

  const colRef = collection(db, "sales");
  const q = query(colRef, sortQuery);
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgressCentered />;

  const sales: Sales[] | DocumentData[] = snapshot!.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
    dateAdded: (doc.data().dateAdded as Timestamp)
      .toDate()
      .toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
  }));

  return <DataGrid headers={TABLE_HEADERS} documents={sales} />;
};

export default SalesDataGrid;
