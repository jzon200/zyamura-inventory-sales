import { DocumentData } from "firebase/firestore";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";
import imgPlaceHolder from "../../assets/image_placeholder.svg";
import { showDeleteDialog, showEditForm } from "../../redux/actions/uiActions";
import { useAppDispatch } from "../../redux/hooks";

const containerVariants: Variants = {
  expand: {
    height: 224,
    outline: "1px solid #554A33",
    alignItems: "start",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
      when: "beforeChildren",
    },
    // transition: {
    //   type: "spring",
    //   mass: 1,
    //   duration: 0.5,
    // },
  },
  shrink: {
    height: 112,
    outline: "0px none transparent",
    alignItems: "center",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
      when: "beforeChildren",
    },
    // transition: {
    //   type: "spring",
    //   mass: 1,
    //   duration: 0.5,
    // },
  },
  hover: {
    outline: "1px solid #554A33",
  },
};

const expandBtnVariants: Variants = {
  expand: {
    top: "45%",
    rotate: 180,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  shrink: {
    top: "40%",
    rotate: [180, 0],
  },
};

const actionBtnVariants: Variants = {
  expand: {
    opacity: [0, 1],
  },
  shrink: {
    opacity: 0,
  },
};

const detailsVariants: Variants = {
  expand: {
    opacity: 1,
    y: 100,
    transition: { type: "tween", delay: 0.3 },
  },
  shrink: {
    opacity: 0,
    y: 100,
  },
};

type Props = {
  headers: Record<string, string>;
  docData: DocumentData;
};

const GridRowData = ({ headers, docData }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const headerKeys = Object.keys(headers);

  const purchasedItems = docData.purchasedItems;

  return (
    <motion.div
      className={`relative grid grid-flow-col auto-cols-fr justify-items-center rounded-3xl py-4 text-[#3A512B] text-xl`}
      variants={containerVariants}
      animate={isExpanded ? "expand" : "shrink"}
      whileHover={"hover"}
      initial={false}
    >
      <motion.button
        variants={expandBtnVariants}
        animate={isExpanded ? "expand" : "shrink"}
        initial={false}
        className="absolute right-2"
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
        }}
      >
        <MdExpandMore size={28} />
      </motion.button>

      {router.pathname !== "/sales" && (
        <Fragment>
          {/* Edit Button */}
          <motion.button
            variants={actionBtnVariants}
            animate={isExpanded ? "expand" : "shrink"}
            initial={false}
            onClick={() => {
              dispatch(showEditForm(docData));
            }}
            className="absolute bottom-12 right-20"
          >
            <FiEdit size={24} />
          </motion.button>
          {/* Delete Button */}
          <motion.button
            variants={actionBtnVariants}
            animate={isExpanded ? "expand" : "shrink"}
            initial={false}
            onClick={() => {
              dispatch(showDeleteDialog(docData));
            }}
            className="absolute bottom-12 right-11"
          >
            <BsTrash size={24} />
          </motion.button>
        </Fragment>
      )}

      {router.pathname !== "/sales" && (
        <motion.div
          variants={detailsVariants}
          animate={isExpanded ? "expand" : "shrink"}
          initial={false}
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
        </motion.div>
      )}

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
          initial={false}
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
    </motion.div>
  );
};

export default GridRowData;
