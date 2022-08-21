import { Checkbox } from "@mui/material";
import type { DocumentData } from "firebase/firestore";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useCallback, useRef, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { MdArchive, MdDelete, MdEdit, MdExpandMore } from "react-icons/md";

import CustomImage from "../../../../common/components/CustomImage";
import { getPhpCurrency } from "../../../../common/utils";
import { useAppDispatch } from "../../../../redux/hooks";
import { showDeleteDialog, showEditForm } from "../../store/actions/uiActions";
import ActionItem from "./ActionItem";

type Props = {
  headers: Record<string, string>;
  docData: DocumentData;
};

export default function TableRow({ headers, docData }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const actionsDialogRef = useRef<HTMLDialogElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const headerKeys = Object.keys(headers);
  // const actionsDialogId = actionsDialogRef.current!;

  const handleCloseDialog = useCallback(() => {
    actionsDialogRef.current?.close();
  }, []);

  return (
    <motion.tr
      className="h-28 relative group rounded-3xl cursor-pointer"
      variants={containerVariants}
      animate={isExpanded ? "expand" : "shrink"}
      initial={false}
      whileHover={"hover"}
      onClick={() => {
        setIsExpanded(!isExpanded);
      }}>
      {(router.pathname === "/admin/products" ||
        router.pathname === "/admin/employees") && (
        <Fragment>
          <td className="w-6 align-middle">
            <Checkbox
              color="default"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </td>
          <td className="w-24 align-middle">
            <CustomImage imageUrl={docData.imageUrl} />
          </td>
        </Fragment>
      )}
      {headerKeys.map((key, index: number) => {
        const data = docData[key];
        let formattedData = data;

        if (typeof data === "number" && (key === "cost" || key === "price")) {
          formattedData = getPhpCurrency(data);
        } else if (typeof data === "number" && key !== "id") {
          formattedData = data.toLocaleString();
        }

        return (
          <td key={index} className={`${isExpanded && "pt-8"}`}>
            {formattedData}
          </td>
        );
      })}
      {/* Ellipsis Button */}
      {(router.pathname === "/admin/products" ||
        router.pathname === "/admin/employees") && (
        <td className="relative align-middle">
          <div
            className={`flex justify-center py-1 rounded-md hover:bg-[#D1CEB2]`}
            title="Actions"
            onClick={(e) => {
              e.stopPropagation();
              if (actionsDialogRef.current?.open) {
                actionsDialogRef.current?.close();
                document.removeEventListener("click", handleCloseDialog);
              } else {
                actionsDialogRef.current?.show();
                document.addEventListener("click", handleCloseDialog);
              }
            }}>
            <FaEllipsisH />
          </div>
          <dialog
            ref={actionsDialogRef}
            className="absolute -left-24 p-0 rounded-md z-10 shadow shadow-zinc-400/80"
            onClick={handleCloseDialog}>
            <ActionItem
              onClick={() => {
                dispatch(showEditForm(docData));
                actionsDialogRef.current?.close();
              }}
              text="Edit"
              icon={MdEdit}
            />
            <ActionItem
              onClick={() => {
                actionsDialogRef.current?.close();
              }}
              text="Archive"
              icon={MdArchive}
            />
            <ActionItem
              onClick={() => {
                dispatch(showDeleteDialog(docData));
                actionsDialogRef.current?.close();
              }}
              text="Delete"
              icon={MdDelete}
              className="text-red-500"
            />
          </dialog>
        </td>
      )}
      <motion.td
        className="absolute bottom-0 left-1/2 hidden group-hover:block"
        variants={expandBtnVariants}
        animate={isExpanded ? "expand" : "shrink"}
        initial={"expand"}>
        <MdExpandMore size={32} color="inherit" />
      </motion.td>
      {/* Product Other Details */}
      {router.pathname === "/admin/products" && (
        <motion.div
          animate={{ opacity: isExpanded ? 1 : 0 }}
          layout
          className="absolute left-56 bottom-16
          grid grid-cols-[repeat(2,_minmax(100px,_150px))] justify-items-center gap-4
           text-base font-medium uppercase">
          <div>Date Added</div>
          <div>Description</div>
          <div className="font-semibold text-[#3A512B]">
            {docData.dateAdded}
          </div>
          <div className="font-semibold text-[#3A512B]">
            {docData.description}
          </div>
        </motion.div>
      )}
    </motion.tr>
  );
}

const containerVariants: Variants = {
  expand: {
    height: 256,
    verticalAlign: "top",
    outline: "1px solid #554A33",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  shrink: {
    height: 112,
    verticalAlign: "middle",
    outline: "0px none transparent",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
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

const detailsVariants: Variants = {
  expand: {
    display: ["none", "grid"],
    opacity: 1,
    transition: { type: "tween", delay: 0.3 },
  },
  shrink: {
    display: ["grid", "none"],
    opacity: [null, 0],
    transition: { type: "tween", delay: 0.2 },
  },
};
