import {
  collection,
  DocumentData,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { MdExpandMore } from "react-icons/md";
import { db } from "../../lib/firebase";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import Table from "../UI/Table";

const TABLE_HEADERS = {
  id: "Transaction ID",
  purchasedItems: "Description",
  author: "Added by",
  totalPrice: "Total",
  transactionDate: "Transaction Date",
};

const TransactionsGrid = () => {
  const colRef = collection(db, "sales");
  const q = query(colRef, orderBy("dateAdded", "desc"));
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgressCentered />;

  const sales: Sales[] | DocumentData = snapshot!.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
    transactionDate: (doc.data().dateAdded as Timestamp)
      .toDate()
      .toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
  }));

  return <Table headers={TABLE_HEADERS} cellsData={sales} />;
};

export default TransactionsGrid;
