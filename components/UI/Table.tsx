import { DocumentData } from "@firebase/firestore";
import Image from "next/image";
import { MdExpandMore } from "react-icons/md";
import imgPlaceHolder from "../../assets/image_placeholder.svg";

// * Headers key must be the same name
// * as DocumentData in Firestore
type Props = {
  headers: object;
  cellsData: object[] | DocumentData;
  //   actionComponent?: ReactElement;
  containsImage?: boolean;
};

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
            {Object.values(headers).map((header) => {
              return (
                <th className="font-medium" key={Math.random()} scope="col">
                  <span>{header}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="h-96 overflow-x-hidden overflow-y-auto text-[#3A512B] text-xl">
          {cellsData.map((docData: DocumentData) => (
            <tr
              className="h-28 text-center rounded-3xl hover:outline outline-1 outline-[#554A33] cursor-pointer"
              key={docData.docId}
            >
              {containsImage && (
                <td>
                  <Image
                    src={!docData.imageUrl ? imgPlaceHolder : docData.imageUrl}
                    className="rounded-md "
                    width={80}
                    height={80}
                    objectFit={"cover"}
                    alt=""
                  />
                </td>
              )}
              {Object.keys(headers).map((key, index) => {
                const data = docData[key];
                let cell = <span>{data}</span>;
                // for purchasedItems in Sales
                if (Array.isArray(data)) {
                  cell = <span>{`${data[0].name}`}</span>;
                }

                if (key == "quantity") {
                  cell = (
                    <span>
                      {data < 1 ? "Not in stock" : data.toLocaleString()}
                    </span>
                  );
                }

                // for price or cost
                if (key == "price" || key == "cost") {
                  cell = (
                    <span>
                      {data.toLocaleString("en-PH", {
                        currency: "PHP",
                        style: "currency",
                      })}
                    </span>
                  );
                }
                return <td key={index}>{cell}</td>;
              })}
              <td>
                <MdExpandMore size={24} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
