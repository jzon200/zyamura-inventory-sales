import {
  collection,
  DocumentData,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import CircularProgressCentered from "../../../common/components/CircularProgressCentered";
import { db } from "../../../firebase";
import { useAppSelector } from "../../../redux/hooks";
import { DataGrid } from "../components";
import Pagination from "../components/ui/Pagination";

const TABLE_HEADERS = {
  id: "Transaction ID",
  totalPrice: "Total Sales",
  author: "Added by",
  dateAdded: "Transaction Date",
};

const SalesDataGrid = () => {
  const sortQuery = useAppSelector((state) => state.firestore.sortQuery);

  const colRef = collection(db, "sales");
  const pageSize = 10;

  const firstPage = query(colRef, sortQuery, limit(pageSize));

  const [pageQuery, setPageQuery] = useState(firstPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [docsSize, setDocsSize] = useState(0);

  const [snapshot, loading] = useCollection(pageQuery);

  useEffect(() => {
    let ignore = false;

    async function getDocSize() {
      const docs = await getDocs(colRef);

      setDocsSize(docs.size);
    }

    if (!ignore) {
      getDocSize();
    }

    return () => {
      ignore = true;
    };
  }, [colRef]);

  if (loading) return <CircularProgressCentered />;

  const snapshotDocs = snapshot!.docs;
  const maxPage = Math.ceil(docsSize / pageSize);

  function handlePrevPage() {
    const firstDoc = snapshotDocs[0];
    const prev = query(
      colRef,
      sortQuery,
      endBefore(firstDoc),
      limitToLast(pageSize)
    );

    setPageQuery(prev);
    setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    const lastDoc = snapshotDocs[snapshotDocs.length - 1];
    const next = query(colRef, sortQuery, startAfter(lastDoc), limit(pageSize));

    setPageQuery(next);
    setCurrentPage(currentPage + 1);
  }

  const sales: Sales[] | DocumentData[] = snapshotDocs.map((doc) => ({
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

  return (
    <Fragment>
      <DataGrid headers={TABLE_HEADERS} documents={sales} />
      <Pagination
        prevDisabled={currentPage === 1}
        nextDisabled={currentPage === maxPage}
        currentPage={currentPage}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </Fragment>
  );
};

export default SalesDataGrid;
