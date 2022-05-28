import { collection, DocumentData, query, Timestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import { useAppSelector } from "../../redux-store/hooks/hooks";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import GridList from "../UI/GridList";

const TABLE_HEADERS = {
  purchasedItems: "",
  id: "Transaction ID",
  author: "Added by",
  totalPrice: "Total",
  dateAdded: "Transaction Date",
};

const TransactionsGrid = () => {
  const sortQuery = useAppSelector((state) => state.firestore.sortQuery);
  const colRef = collection(db, "sales");
  const q = query(colRef, sortQuery);
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgressCentered />;

  const sales: Sales[] | DocumentData = snapshot!.docs.map((doc) => ({
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

  return <GridList headers={TABLE_HEADERS} rowData={sales} />;
};

export default TransactionsGrid;
