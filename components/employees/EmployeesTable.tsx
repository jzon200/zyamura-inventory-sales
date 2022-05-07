import { collection, DocumentData, orderBy, query } from "firebase/firestore";
import React, { Fragment } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import { useAppSelector } from "../../redux-store/hooks/hooks";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import EmployeesRowData from "./EmployeesRowData";

const EmployeesTable = () => {
  const productQuery = useAppSelector((state) => state.employees.employeeQuery);
  const collectionRef = collection(db, "employees");
  const q = query(
    collectionRef,
    orderBy(
      productQuery.queryConstraint!,
      productQuery.descending ? "desc" : "asc"
    )
  );
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgressCentered />;

  const employees: Employee[] | DocumentData = snapshot!.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });

  return (
    <Fragment>
      {/* <TableHeader /> */}
      <div className="overflow-y-scroll py-8 h-4/5">
        <div className="grid grid-cols-7 gap-y-8 place-items-center select-none text-[#3A512B] text-xl">
          {employees.map((employee: Employee) => (
            <EmployeesRowData key={employee.docId} employee={employee} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeesTable;