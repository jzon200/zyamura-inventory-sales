import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { deleteDoc, doc } from "firebase/firestore";
import { FC, useState } from "react";
import { MdOutlineClose, MdWarning } from "react-icons/md";
import { db } from "../../lib/firebase";
import { useAppSelector } from "../../redux-store/hooks/hooks";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import MuiModal from "../UI/Modal";

type Props = {
  showDialog: boolean;
  onClose: () => void;
};

const DeleteDialog: FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const selectedProduct = useAppSelector((state) => state.products.product);

  const { showDialog, onClose } = props;

  return (
    <MuiModal showModal={showDialog} onClose={onClose}>
      {isLoading && <CircularProgressCentered />}
      {!isLoading && (
        <div className="absolute top-1/3 left-[38%] rounded-xl p-6 w-[616px] h-[288px] bg-white drop-shadow-lg">
          <div className="flex justify-between items-center text-xl font-medium">
            Delete Item
            <button onClick={onClose}>
              <MdOutlineClose size={24} />
            </button>
          </div>
          <div className="flex gap-2 items-center m-6 text-red-500">
            <MdWarning size={24} />
            This will permanently delete the item in the inventory.
          </div>
          <div className="mt-32">
            <div className="flex gap-2 justify-end">
              <button onClick={onClose} className="text-gray-400">
                Cancel
              </button>
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await deleteDoc(doc(db, "products", selectedProduct?.docId));
                  setIsLoading(false);
                  onClose();
                }}
                className="rounded-md px-4 py-2 bg-red-500 text-red-50"
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
