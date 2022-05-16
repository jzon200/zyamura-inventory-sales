import { ReactNode } from "react";
import MuiModal from "./Modal";

type Props = {
  title: string;
  submitLabel: string;
  className?: string;
  showModal: boolean;
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
};

const FormModal = ({
  title = "Add Items",
  submitLabel = "Submit",
  className,
  showModal,
  children,
  onSubmit,
  onClose,
}: Props) => {
  return (
    <MuiModal showModal={showModal} onClose={onClose}>
      <div
        className={`${className} w-[32rem] px-8 py-4 rounded-xl bg-white text-slate-500`}
      >
        <div className="text-center text-2xl mb-4">{title}</div>
        <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
          {children}
          <button className="col-span-2 place-self-end btn-primary">
            {submitLabel}
          </button>
        </form>
      </div>
    </MuiModal>
  );
};

export default FormModal;
