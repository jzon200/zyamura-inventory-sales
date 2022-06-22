import { DocumentData } from "firebase/firestore";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";
import { showDeleteDialog, showEditForm } from "../../redux/actions/uiActions";
import { useAppDispatch } from "../../redux/hooks";

const containerVariants: Variants = {
  expand: {
    height: 224,
    outline: "1px solid #554A33",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
      when: "beforeChildren",
    },
  },
  shrink: {
    height: 112,
    outline: "0px none transparent",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
      when: "beforeChildren",
    },
  },
  hover: {
    outline: "1px solid #554A33",
  },
};

const cellVariants: Variants = {
  expand: {
    y: -50,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.5,
    },
  },
  shrink: {
    y: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const expandBtnVariants: Variants = {
  expand: {
    rotate: 180,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  shrink: {
    rotate: [180, 0],
  },
};

const actionBtnVariants: Variants = {
  expand: {
    display: "block",
    opacity: [0, 1],
  },
  shrink: {
    display: "none",
    opacity: 0,
  },
};

const detailsVariants: Variants = {
  expand: {
    display: "grid",
    opacity: 1,
    y: 50,
    transition: { type: "tween", delay: 0.3 },
  },
  shrink: {
    display: "none",
    opacity: 0,
    y: 50,
  },
};

type Props = {
  headers: Record<string, string>;
  docData: DocumentData;
};

const DataRow = ({ headers, docData }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [showActions, setShowActions] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const headerKeys = Object.keys(headers);

  const purchasedItems = docData.purchasedItems;

  return (
    <motion.div
      className="group relative grid grid-flow-col auto-cols-fr place-items-center rounded-3xl py-4 text-[#3A512B] text-xl"
      variants={containerVariants}
      animate={isExpanded ? "expand" : "shrink"}
      whileHover={"hover"}
      initial={false}
    >
      <div
        className="group-hover:bg-[#CCCABD] absolute right-0 h-full grid place-items-center rounded-r-3xl cursor-pointer"
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
        }}
      >
        <motion.button
          variants={expandBtnVariants}
          animate={isExpanded ? "expand" : "shrink"}
          initial={false}
        >
          <MdExpandMore size={28} color="inherit" />
        </motion.button>
      </div>
      {router.pathname !== "/sales" && (
        <Fragment>
          <motion.div
            variants={detailsVariants}
            animate={isExpanded ? "expand" : "shrink"}
            initial={false}
            className="absolute left-64"
          >
            <div className="grid grid-cols-2 justify-items-center gap-4 text-base uppercase">
              <div>Date Added</div>
              <div>Description</div>
              <div className="font-medium">{docData.dateAdded}</div>
              <div className="font-medium">{docData.description}</div>
            </div>
          </motion.div>

          {/* Edit Button */}
          <motion.button
            variants={actionBtnVariants}
            animate={isExpanded ? "expand" : "shrink"}
            initial={false}
            onClick={() => {
              dispatch(showEditForm(docData));
            }}
            className="absolute bottom-4 right-24"
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
            className="absolute bottom-4 right-16"
          >
            <BsTrash size={24} />
          </motion.button>
        </Fragment>
      )}
      {headerKeys.map((key, index) => {
        const data = docData[key];

        if (key === "imageUrl") {
          return (
            <motion.div
              key={index}
              variants={cellVariants}
              animate={isExpanded ? "expand" : "shrink"}
            >
              <Image
                src={data != null ? data : "/svg/image_placeholder.svg"}
                className="col-span-1 rounded-md"
                width={80}
                height={80}
                objectFit={"cover"}
                layout={"fixed"}
                alt=""
              />
            </motion.div>
          );
        }

        //* Ellipsis Button
        // if (key === "actions") {
        //   return (
        //     <div className="relative">
        //       <IoEllipsisVertical
        //         className="cursor-pointer"
        //         onClick={() => {
        //           setShowActions((prevState) => !prevState);
        //         }}
        //       />
        //       <motion.div
        //         className="absolute right-4 top-0 w-24 p-4 bg-white"
        //         animate={{
        //           display: showActions ? "block" : "none",
        //         }}
        //       >
        //         <div>Edit</div>
        //         <div>Archive</div>
        //         <div>Delete</div>
        //       </motion.div>
        //     </div>
        //   );
        // }

        if (key === "status") {
          const quantity = docData.quantity;
          let chip = (
            <motion.div
              variants={cellVariants}
              animate={isExpanded ? "expand" : "shrink"}
              className="chip bg-green-300 text-green-700"
            >
              Available
            </motion.div>
          );

          if (quantity < 1) {
            chip = (
              <motion.div
                variants={cellVariants}
                animate={isExpanded ? "expand" : "shrink"}
                className="chip bg-red-300 text-red-700"
              >
                Out of stock
              </motion.div>
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
                <motion.div
                  key={imageUrl}
                  variants={cellVariants}
                  animate={isExpanded ? "expand" : "shrink"}
                >
                  <Image
                    src={
                      imageUrl != null ? imageUrl : "/svg/image_placeholder.svg"
                    }
                    className="rounded-md"
                    width={60}
                    height={60}
                    objectFit={"cover"}
                    layout={"fixed"}
                    alt=""
                  />
                </motion.div>
              ))}
            </div>
          );
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

        return (
          <motion.div
            key={`doc-${index}`}
            variants={cellVariants}
            animate={isExpanded ? "expand" : "shrink"}
            initial={false}
          >
            {formattedData}
          </motion.div>
        );
      })}

      {purchasedItems != null && (
        <motion.div
          variants={detailsVariants}
          animate={isExpanded ? "expand" : "shrink"}
          className="absolute top-16 left-24 grid grid-cols-3 gap-x-4 text-base max-h-24 overflow-y-auto"
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

export default DataRow;
