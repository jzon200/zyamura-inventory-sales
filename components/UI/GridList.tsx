import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import imgPlaceHolder from "../../assets/image_placeholder.svg";
import { MdExpandMore } from "react-icons/md";

type GridListProps = {
  headers: Record<string, string>;
  rowData: object[] | DocumentData;
};

const GridList = ({ headers, rowData }: GridListProps) => {
  const headerKeys = Object.keys(headers);
  const colLength = headerKeys.length;

  return (
    <div className="mt-8 h-[80%] overflow-y-auto p-4">
      <div
        className={`sticky top-0 grid grid-cols-fixed-${colLength} justify-items-center text-lg text-[#919F88] uppercase`}
      >
        {headerKeys.map((key, index) => (
          <div key={`header-${index}`} className={`font-medium`}>
            {headers[key]}
          </div>
        ))}
      </div>
      <div className="grid gap-y-4">
        {rowData.map((data: DocumentData) => (
          <RowData key={data.docId} headers={headers} docData={data} />
        ))}
      </div>
    </div>
  );
};

type RowDataProps = {
  headers: Record<string, string>;
  docData: DocumentData;
};

const variants = {
  active: {
    height: [112, 224],
    outline: "1px solid #554A33",
    verticalAlign: "top",
  },
  inactive: {
    height: [224, 112],
    outline: "0px none transparent",
    verticalAlign: "middle",
  },
};

//* I seperate this because it is a controlled component
const RowData = ({ headers, docData }: RowDataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const headerKeys = Object.keys(headers);
  const colLength = headerKeys.length;
  const ExpandButton = motion(MdExpandMore);

  return (
    <motion.div
      className={`relative grid grid-cols-fixed-${colLength} justify-items-center rounded-3xl py-4`}
      onClick={() => {
        setIsExpanded((prevState) => !prevState);
      }}
      animate={isExpanded ? "active" : "inactive"}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
      whileHover={{ outline: "1px solid #554A33" }}
      variants={variants}
      layout
    >
      {headerKeys.map((key, index) => {
        const data = docData[key];

        if (key === "imageUrl") {
          return (
            <Image
              src={data != null ? data : imgPlaceHolder}
              className="rounded-md"
              width={80}
              height={80}
              objectFit={"cover"}
              layout={"fixed"}
              alt=""
            />
          );
        }

        const isCurrency =
          key === "price" || key === "cost" || key === "totalPrice";

        let formattedData = data;

        if (Array.isArray(data)) {
          formattedData = `${data[0].name}`;
        }

        if (typeof data === "number" && key != "id" && key != "contactNumber") {
          formattedData = data.toLocaleString();
        }

        if (key === "quantity") {
          formattedData = data < 1 ? "Not in stock" : data.toLocaleString();
        }

        if (isCurrency) {
          formattedData = data.toLocaleString("en-PH", {
            currency: "PHP",
            style: "currency",
          });
        }

        return <div key={`${data.docId}-${index}`}>{formattedData}</div>;
      })}

      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0, y: [100, 100] }}
        transition={{ type: "tween", delay: isExpanded ? 0.3 : 0 }}
        className="absolute left-56"
      >
        <div className="grid grid-cols-3 gap-4 text-base uppercase">
          <div>Date Added</div>
          <div>Age</div>
          <div>Description</div>
          <div className="font-medium">{docData.dateAdded}</div>
          <div className="font-medium">{docData.year}</div>
          <div className="font-medium">{docData.description}</div>
        </div>
      </motion.div>

      <ExpandButton
        className="absolute top-4 right-4 center-hack"
        size={28}
        animate={{
          rotate: isExpanded ? 180 : [180, 0],
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
      />
    </motion.div>
  );
};

export default GridList;
