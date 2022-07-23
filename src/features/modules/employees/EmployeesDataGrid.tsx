import { collection, DocumentData, query, Timestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import CircularProgressCentered from "../../../common/components/CircularProgressCentered";
import { db } from "../../../firebase";
import { useAppSelector } from "../../../redux/hooks";
import { DataGrid } from "../components/data-grid";

const TABLE_HEADERS = {
  imageUrl: "",
  id: "Employee ID",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  contactNumber: "Contact Number",
  role: "Role ",
};

export default function EmployeesDataGrid() {
  const sortQuery = useAppSelector((state) => state.firestore.sortQuery);

  const collectionRef = collection(db, "employees");
  const q = query(collectionRef, sortQuery);
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgressCentered />;

  const employees: Employee[] | DocumentData = snapshot!.docs.map((doc) => {
    const dateAdded = doc.data().dateAdded as Timestamp;
    const dateModified = doc.data().dateModified as Timestamp;

    return {
      ...doc.data(),
      docId: doc.id,
      dateAdded: dateAdded
        ? dateAdded.toDate().toLocaleDateString()
        : dateAdded,
      dateModified: dateModified
        ? dateModified.toDate().toLocaleDateString()
        : dateModified,
    };
  });

  return <DataGrid headers={TABLE_HEADERS} data={employees} />;
}
