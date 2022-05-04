import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { MdOutlineClose, MdWarning } from "react-icons/md";
import { db } from "../../lib/firebase";
import { useAppSelector } from "../../redux-store/hooks/hooks";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import MuiModal from "../UI/Modal";

type Props = {
  showDialog: boolean;
  onClose: () => void;
};

const DeleteDialog = ({ showDialog, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const selectedProduct = useAppSelector((state) => state.products.product);

  return (
    <MuiModal showModal={showDialog} onClose={onClose}>
      {isLoading && <CircularProgressCentered className="h-full" />}
      {!isLoading && (
        <div className="absolute top-1/3 left-[38%] rounded-xl p-6 w-[616px] h-[288px] bg-white drop-shadow-lg select-none">
          <div className="flex justify-between items-center text-xl font-medium">
            Delete Item
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <MdOutlineClose size={24} />
            </button>
          </div>
          <div className="flex gap-2 items-center m-6 text-red-500">
            <MdWarning size={24} />
            This will permanently delete the item in the inventory.
          </div>
          <div className="mt-32">
            <div className="flex gap-2 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-400 text-gray-500 hover:border-gray-500 hover:text-gray-700 "
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await deleteDoc(doc(db, "products", selectedProduct?.docId));
                  setIsLoading(false);
                  onClose();
                }}
                className="rounded-md px-4 py-2 bg-red-600 text-red-50 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </MuiModal>
  );
};

export default DeleteDialog;
