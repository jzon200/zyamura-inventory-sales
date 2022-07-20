import { DocumentData } from "firebase/firestore";
import DataRow from "./DataRow";

type Props = {
  headers: Record<string, string>;
  data: object[] | DocumentData;
};

export default function DataGrid({ headers, data }: Props) {
  const headerKeys = Object.keys(headers);

  return (
    <div className="mt-8 h-[90%] overflow-y-auto">
      <div
        className={`sticky top-0 grid grid-flow-col auto-cols-fr justify-items-center text-lg px-4 bg-primary-light text-[#919F88] uppercase z-20`}
      >
        {headerKeys.map((key, index) => (
          <div key={`header-${index}`} className={`font-medium`}>
            {headers[key]}
          </div>
        ))}
      </div>
      <div className="grid gap-y-4 p-4">
        {data.map((data: DocumentData) => (
          <DataRow key={data.docId} headers={headers} docData={data} />
        ))}
      </div>
    </div>
  );
}
