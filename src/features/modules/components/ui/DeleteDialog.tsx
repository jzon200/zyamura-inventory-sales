import { MdOutlineClose, MdWarning } from "react-icons/md";

import {
  CircularProgressCentered,
  MuiModal,
} from "../../../../common/components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { deleteDocumentData } from "../../store/actions/firestoreActions";
import { setShowDeleteDialog } from "../../store/reducers/uiReducer";

type Props = {
  collectionName: CollectionName;
};

export default function DeleteDialog({ collectionName }: Props) {
  const { showDeleteDialog, showLoadingSpinner, selectedDocument } =
    useAppSelector((state) => ({
      showDeleteDialog: state.ui.showDeleteDialog,
      showLoadingSpinner: state.ui.showLoadingSpinner,
      selectedDocument: state.firestore.selectedDocument,
    }));

  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(setShowDeleteDialog(false));
  }

  function handleDelete() {
    dispatch(deleteDocumentData(collectionName, selectedDocument));
  }

  return (
    <MuiModal showModal={showDeleteDialog} onClose={handleClose}>
      {showLoadingSpinner && <CircularProgressCentered />}
      {!showLoadingSpinner && (
        <div className="absolute top-1/3 left-[38%] rounded-xl p-6 w-[616px] h-[288px] bg-white drop-shadow-lg ">
          <div className="flex justify-between items-center text-xl font-medium">
            <div>Delete Item</div>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              <MdOutlineClose size={24} />
            </button>
          </div>
          <div className="flex gap-2 items-center m-6 text-red-500">
            <MdWarning size={24} />
            <div>This will permanently delete the item in the inventory.</div>
          </div>
          <div className="mt-32">
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-md border border-gray-400 text-gray-500 hover:border-gray-500 hover:text-gray-700 "
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
}
