import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { FC, Fragment, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { closeModal, selectModal } from "../../redux-store/slices/modalSlice";

const MuiModal: FC<{ children: ReactNode }> = (props) => {
  const open = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(closeModal());
  };

  return (
    <Fragment>
      {/* <Button onClick={() => dispatch(openModal())}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={closeHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fragment>{props.children}</Fragment>
      </Modal>
    </Fragment>
  );
};

export default MuiModal;
