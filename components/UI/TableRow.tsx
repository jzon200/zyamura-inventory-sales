import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import Image from "next/image";
import imgPlaceHolder from "../../assets/image_placeholder.svg";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { motion } from "framer-motion";

type Props = {
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
    outline: "none",
    verticalAlign: "middle",
  },
};

const TableRow = ({ headers, docData }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const ExpandButton = motion(MdExpandMore);
  const EditButton = motion(FiEdit);
  // const MotionImage = motion(Image);

  return (
    <motion.tr
      className={`relative rounded-3xl text-center`}
      onClick={() => {
        setIsExpanded((prevState) => !prevState);
      }}
      animate={isExpanded ? "active" : "inactive"}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
      whileHover={{ outline: "1px solid #554A33" }}
      variants={variants}
      layout
    >
      {/* {containsImage && (
        <motion.td
          // animate={{ y: isExpanded ? [0, -50] : [-50, 0] }}
          transition={{ type: "tween", duration: 0.5 }}
          className="text-right"
        >
          <Image
            src={!docData.imageUrl ? imgPlaceHolder : docData.imageUrl}
            className="rounded-md "
            width={80}
            height={80}
            objectFit={"cover"}
            alt=""
          />
        </motion.td>
      )} */}

      {Object.keys(headers).map((key, index) => {
        const data = docData[key];
        const isCurrency =
          key == "price" || key == "cost" || key == "totalPrice";
        let cell = <span>{data}</span>; // for purchasedItems in Sales

        if (Array.isArray(data)) {
          cell = <span>{`${data[0].name}`}</span>;
        }

        if (typeof data === "number" && key != "id" && key != "contactNumber") {
          cell = <span>{data.toLocaleString()}</span>;
        }

        if (key == "quantity") {
          cell = (
            <span>{data < 1 ? "Not in stock" : data.toLocaleString()}</span>
          );
        }

        if (isCurrency) {
          cell = (
            <span>
              {data.toLocaleString("en-PH", {
                currency: "PHP",
                style: "currency",
              })}
            </span>
          );
        }

        return (
          <motion.td
            key={index}
            // animate={{ y: isExpanded ? [0, -50] : [-50, 0] }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {cell}
          </motion.td>
        );
      })}

      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0, y: [100, 100] }}
        transition={{ type: "tween", delay: isExpanded ? 0.3 : 0 }}
        className="absolute left-56"
      >
        <div className="grid grid-cols-3 gap-y-2 text-base uppercase">
          <div>Date Added</div>
          <div>Age</div>
          <div>Description</div>
          <div className="font-medium">{docData.dateAdded}</div>
          <div className="font-medium">{docData.year}</div>
          <div className="font-medium">{docData.description}</div>
        </div>
      </motion.div>

      <td>
        {
          <ExpandButton
            size={28}
            animate={{
              rotate: isExpanded ? 180 : [180, 0],
              // y: isExpanded ? [-50, -50] : [-50, 0],
            }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            // initial={{ rotate: isExpanded ? 180 : 0 }}
          />
        }

        {/* <EditButton
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          title="Edit"
          className="absolute bottom-12 right-20"
          size={24}
        /> */}

        {/* {isExpanded && (
          <div className="flex gap-2">
            <FiEdit />
            <BsTrash />
          </div>
        )} */}
      </td>
      {/* {isExpanded && (
        <FiEdit
          title="Edit"
          className="absolute bottom-12 right-20"
          size={24}
        />
      )}
      {isExpanded && (
        <BsTrash
          title="Delete"
          className="absolute bottom-12 right-11"
          size={24}
        />
      )} */}
      {/* {isExpanded && <div>Date Added</div>} */}
    </motion.tr>
  );
};

export default TableRow;
