import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import { Fragment } from "react";
import TableRow from "./TableRow";

type Props = {
  headers: Record<string, string>;
  documents: DocumentData[];
};

export default function TableContent({ headers, documents }: Props) {
  const headerKeys = Object.keys(headers);

  const router = useRouter();

  const tableHeaders = headerKeys.map((key, index) => (
    <th key={index}>{headers[key]}</th>
  ));

  const theadContent =
    router.pathname === "/admin/products" ||
    router.pathname === "/admin/employees" ? (
      <Fragment>
        <th></th>
        <th></th>
        {tableHeaders}
        <th></th>
      </Fragment>
    ) : (
      tableHeaders
    );

  return (
    <div className="mt-8 h-[90%] px-4 overflow-y-auto">
      <table className="w-full table-auto border-separate border-spacing-y-4 text-lg">
        <thead className="sticky top-0 bg-primary-light text-[#919F88] z-20">
          <tr className="font-medium">{theadContent}</tr>
        </thead>
        <tbody className="h-96 text-center text-[#3A512B] text-xl">
          {documents.map((data: DocumentData) => (
            <TableRow key={data.docId} headers={headers} docData={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
