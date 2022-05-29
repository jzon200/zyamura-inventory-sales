import { DocumentData } from "firebase/firestore";
import GridRowData from "./RowData";

type GridListProps = {
  headers: Record<string, string>;
  rowData: object[] | DocumentData;
};

// TODO: Fixed the Animation Logic
const GridList = ({ headers, rowData }: GridListProps) => {
  const headerKeys = Object.keys(headers);

  return (
    <div className="mt-8 h-[80%] overflow-y-auto">
      <div
        className={`sticky top-0 grid grid-flow-col auto-cols-fr justify-items-center text-lg px-4 bg-primary-light text-[#919F88] uppercase  z-20`}
      >
        {headerKeys.map((key, index) => (
          <div key={`header-${index}`} className={`font-medium`}>
            {headers[key]}
          </div>
        ))}
      </div>
      <div className="grid gap-y-4 p-4">
        {rowData.map((data: DocumentData) => (
          <GridRowData
            key={`doc-${data.docId}`}
            headers={headers}
            docData={data}
          />
        ))}
      </div>
    </div>
  );
};

export default GridList;
