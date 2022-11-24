import { Checkbox } from "@mui/material";
import type { DocumentData } from "firebase/firestore";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
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
  const actionsRef = useRef<HTMLDialogElement>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const headerKeys = Object.keys(headers);

  function handleCloseActions() {
    actionsRef.current?.close();
    document.removeEventListener("click", handleCloseActions);
  }

  return (
    <motion.tr
      className="relative rounded-3xl cursor-pointer"
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
          <motion.td
            key={index}
            initial={false}
            variants={cellVariants}
            className={`${isExpanded && "pt-8"}`}>
            <span
              className="cursor-text"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              {formattedData}
            </span>
          </motion.td>
        );
      })}
      {/* Ellipsis Button */}
      {(router.pathname === "/admin/products" ||
        router.pathname === "/admin/employees") && (
        <td className="relative align-middle">
          <div
            className="flex justify-center py-1 rounded-md hover:bg-[#D1CEB2]"
            title="Actions"
            onClick={(e) => {
              e.stopPropagation();

              if (actionsRef.current?.open) {
                handleCloseActions();
              } else {
                actionsRef.current?.show();
                document.addEventListener("click", handleCloseActions);
              }
            }}>
            <FaEllipsisH />
          </div>
          <dialog
            ref={actionsRef}
            className="absolute -left-24 p-0 rounded-md z-10 shadow shadow-zinc-400/80"
            onClick={handleCloseActions}>
            <ActionItem
              onClick={() => {
                dispatch(showEditForm(docData));
                handleCloseActions();
              }}
              text="Edit"
              icon={MdEdit}
            />
            <ActionItem
              onClick={() => {
                handleCloseActions();
              }}
              text="Archive"
              icon={MdArchive}
            />
            <ActionItem
              onClick={() => {
                dispatch(showDeleteDialog(docData));
                handleCloseActions();
              }}
              text="Delete"
              icon={MdDelete}
              className="text-red-500"
            />
          </dialog>
        </td>
      )}
      <motion.td
        className="absolute bottom-0 left-1/2"
        variants={expandBtnVariants}>
        <MdExpandMore size={36} color="inherit" />
      </motion.td>
      {/* Product Other Details */}
      {router.pathname === "/admin/products" && (
        <AnimatePresence>
          {isExpanded && (
            <motion.table
              // variants={detailsVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-44 bottom-16 uppercase
          table-auto border-separate border-spacing-x-7 cursor-text"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <thead className="text-sm">
                <tr>
                  <th>Date Added</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody className="text-base">
                <tr>
                  <td>{docData.dateAdded}</td>
                  <td>{docData.description}</td>
                </tr>
              </tbody>
            </motion.table>
          )}
        </AnimatePresence>
      )}
    </motion.tr>
  );
}

const containerVariants: Variants = {
  expand: {
    height: 256,
    outline: "1px solid #554A33",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  shrink: {
    height: 112,
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
    verticalAlign: "top",
    paddingTop: 16,
  },
  shrink: {
    verticalAlign: "middle",
    paddingTop: 0,
    transition: {
      delay: 0.3,
    },
  },
};

const expandBtnVariants: Variants = {
  expand: {
    rotate: 180,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  shrink: {
    rotate: 0,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  hover: {
    opacity: 1,
  },
};
