import { DocumentData } from "@firebase/firestore";
import TableRow from "./TableRow";

// * Headers key must be the same name
// * as DocumentData in Firestore
type Props = {
  headers: Record<string, string>;
  cellsData: object[] | DocumentData;
  //   actionComponent?: ReactElement;
  containsImage?: boolean;
};

//! Will be removed tommorow cause i will use grid Instead
const Table = ({
  headers,
  cellsData,
  //   actionComponent,
  containsImage,
}: Props) => {
  return (
    <div className="mt-8 h-[80vh] overflow-y-auto">
      <table className="table-auto border-separate w-full text-lg">
        <thead className="sticky top-0 text-[#919F88] uppercase">
          <tr>
            {/* empty header for spacing image */}
            {containsImage && <th scope="col" />}
            {Object.keys(headers).map((key) => {
              return (
                <th className={`font-medium`} key={Math.random()} scope="col">
                  <span>{headers[key]}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="h-96 overflow-x-hidden overflow-y-auto text-[#3A512B] text-xl">
          {cellsData.map((docData: DocumentData) => (
            <TableRow key={docData.id} headers={headers} docData={docData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
