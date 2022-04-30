import Modal from "@mui/material/Modal";
import { FC, Fragment, ReactNode } from "react";

type Props = {
  showModal: boolean;
  onClose: () => void;
  children: ReactNode;
};

const MuiModal: FC<Props> = (props) => {
  const { showModal, onClose, children } = props;

  return (
    <Fragment>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fragment>{children}</Fragment>
      </Modal>
    </Fragment>
  );
};

export default MuiModal;
