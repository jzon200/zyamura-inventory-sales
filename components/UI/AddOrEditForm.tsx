import { ReactNode } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useAppSelector } from "../../redux-store/hooks/hooks";

type Props = {
  title: string;
  className?: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
};

const AddOrEditForm = ({
  title,
  className,
  children,
  onSubmit,
  onClose,
}: Props) => {
  const formAction = useAppSelector((state) => state.ui.formAction);

  const isEditing = formAction === "edit";

  return (
    <div className="w-[50vh] mx-auto my-[25vh]">
      <div
        className={`${className} relative w-[32rem] px-8 py-4 rounded-xl bg-white text-slate-500`}
      >
        <button
          className="absolute top-6 right-6 text-red-400 hover:text-red-500"
          onClick={onClose}
        >
          <MdOutlineClose size={24} />
        </button>
        <div className="text-center text-2xl mb-4">{`${
          isEditing ? "Edit" : "Add"
        } ${title}`}</div>
        {/* TODO: Add Error Validation Helpers */}
        <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
          {children}
          <div className="col-span-2 place-self-end">
            <button
              className="outline outline-1 outline-blue-500 p-2 rounded-lg text-lg text-blue-500 mr-4
                  hover:outline-blue-600 hover:text-blue-600"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="btn-primary">
              {isEditing ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditForm;
