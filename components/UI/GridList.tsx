import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import Image from "next/image";
import { forwardRef, Fragment, LegacyRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";
import imgPlaceHolder from "../../assets/image_placeholder.svg";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { setSelectedDocument } from "../../redux-store/slices/firestoreSlice";
import {
  setFormAction,
  setShowFormModal,
  showEditForm,
} from "../../redux-store/slices/uiSlice";

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
          <RowData key={`doc-${data.docId}`} headers={headers} docData={data} />
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
    alignItems: "start",
  },
  inactive: {
    height: [224, 112],
    outline: "0px none transparent",
    alignItems: "center",
  },
};

//* I seperate this because it is a controlled component
const RowData = ({ headers, docData }: RowDataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useAppDispatch();

  const headerKeys = Object.keys(headers);

  const ExpandButton = motion(
    forwardRef((_, ref: LegacyRef<HTMLButtonElement>) => (
      <button
        className="absolute top-4 right-4"
        ref={ref}
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
        }}
      >
        <MdExpandMore size={28} />
      </button>
    ))
  );

  // TODO: Optionally show this
  const EditButton = motion(
    forwardRef((_, ref: LegacyRef<HTMLButtonElement>) => (
      <button
        onClick={() => {
          // TODO: Set to Dynamic DocumentData
          dispatch(setSelectedDocument(docData));
          dispatch(setFormAction("edit"));
          dispatch(setShowFormModal(true));
        }}
        className="absolute bottom-12 right-20"
        ref={ref}
      >
        <FiEdit size={24} />
      </button>
    ))
  );

  // TODO: Optionally show this
  const DeleteButton = motion(
    forwardRef((_, ref: LegacyRef<HTMLButtonElement>) => (
      <button
        onClick={() => {
          dispatch(showEditForm(docData));
        }}
        className="absolute bottom-12 right-11"
        ref={ref}
      >
        <BsTrash size={24} />
      </button>
    ))
  );

  const purchasedItems = docData.purchasedItems;

  return (
    <motion.div
      className={`relative grid grid-flow-col auto-cols-fr justify-items-center rounded-3xl py-4 text-[#3A512B] text-xl`}
      variants={variants}
      animate={isExpanded ? "active" : "inactive"}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
      whileHover={{ outline: "1px solid #554A33" }}
    >
      {headerKeys.map((key, index) => {
        const data = docData[key];

        if (key === "imageUrl") {
          return (
            <Image
              key={Math.random()}
              src={data != null ? data : imgPlaceHolder}
              className="col-span-1 rounded-md"
              width={80}
              height={80}
              objectFit={"cover"}
              layout={"fixed"}
              alt=""
            />
          );
        }

        if (key === "status") {
          const quantity = docData.quantity;
          let chip = (
            <div
              key={Math.random()}
              className="chip bg-green-300 text-green-700"
            >
              Available
            </div>
          );

          if (quantity < 1) {
            chip = (
              <div key={Math.random()} className="chip bg-red-300 text-red-700">
                Out of stock
              </div>
            );
          }

          return chip;
        }

        const isCurrency =
          key === "price" || key === "cost" || key === "totalPrice";

        let formattedData = data;

        if (Array.isArray(data)) {
          formattedData = `${data[0].name}`;
          const images = data.map((item) => item.imageUrl as string);

          return (
            <div className="grid grid-flow-col auto-cols-fr gap-x-2">
              {images.map((imageUrl) => (
                <Image
                  key={Math.random()}
                  src={imageUrl != null ? imageUrl : imgPlaceHolder}
                  className="rounded-md"
                  width={60}
                  height={60}
                  objectFit={"cover"}
                  layout={"fixed"}
                  alt=""
                />
              ))}
            </div>
          );
          // return (
          //   <div className="relative">
          //     {images.map((imageUrl, index) => (
          //       <div
          //         className={`absolute top-0 left-${
          //           index === 0 ? 0 : 4 + index
          //         } ${index === 0 ? "z-[1]" : `-z-[${index}]`}`}
          //       >
          //         <Image
          //           key={Math.random()}
          //           src={imageUrl != null ? imageUrl : imgPlaceHolder}
          //           className={`rounded-md`}
          //           width={60}
          //           height={60}
          //           objectFit={"cover"}
          //           layout={"fixed"}
          //           alt=""
          //         />
          //       </div>
          //     ))}
          //   </div>
          // );
        }

        if (typeof data === "number" && key != "id" && key != "contactNumber") {
          formattedData = data.toLocaleString();
        }

        if (isCurrency) {
          formattedData = data.toLocaleString("en-PH", {
            currency: "PHP",
            style: "currency",
          });
        }

        return <div key={`doc-${index}`}>{formattedData}</div>;
      })}

      {purchasedItems != null && (
        <motion.div
          animate={{ opacity: isExpanded ? [0, 1] : 0 }}
          className="absolute top-24 left-24 grid grid-cols-3 gap-x-4 text-base max-h-28 overflow-y-auto"
        >
          <div className="sticky top-0 text-[#919F88] bg-primary-light">
            Items
          </div>
          <div className="sticky top-0 text-center text-[#919F88] bg-primary-light">
            Quantity
          </div>
          <div className="sticky top-0 text-center text-[#919F88] bg-primary-light">
            Price
          </div>
          {purchasedItems.map((item: DocumentData) => {
            return (
              <Fragment key={item.docId}>
                <div className="font-medium">{item.name}</div>
                <div className="text-center font-medium">
                  {item.quantity.toLocaleString()}
                </div>
                <div className="text-center font-medium">
                  {item.price.toLocaleString("en-PH", {
                    currency: "PHP",
                    style: "currency",
                    maximumFractionDigits: 0,
                  })}
                </div>
              </Fragment>
            );
          })}
        </motion.div>
      )}

      {/* TODO: Show Conditionally */}
      {/* <motion.div
        animate={{ opacity: isExpanded ? 1 : 0, y: [100, 100] }}
        transition={{ type: "tween", delay: isExpanded ? 0.3 : 0 }}
        className="absolute left-64"
      >
        <div className="grid grid-cols-3 justify-items-center gap-4 text-base uppercase">
          <div>Date Added</div>
          <div>Age</div>
          <div>Description</div>
          <div className="font-medium">{docData.dateAdded}</div>
          <div className="font-medium">{docData.year}</div>
          <div className="font-medium">{docData.description}</div>
        </div>
      </motion.div> */}

      <ExpandButton
        animate={{
          rotate: isExpanded ? [0, 180] : [180, 0],
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      />
      {isExpanded && (
        <>
          <EditButton
            animate={{ opacity: isExpanded ? [0, 1] : 0 }}
            transition={{ type: "tween", delay: 0.3 }}
          />
          <DeleteButton
            animate={{ opacity: isExpanded ? [0, 1] : 0 }}
            transition={{ type: "tween", delay: 0.3 }}
          />
        </>
      )}
    </motion.div>
  );
};

export default GridList;
