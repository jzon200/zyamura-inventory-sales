import { ReactNode } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useAppSelector } from "../../../../redux/hooks";

type Props = {
  title: string;
  className?: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
};

export default function EntryForm({
  title,
  className,
  children,
  onSubmit,
  onClose,
}: Props) {
  const formAction = useAppSelector((state) => state.ui.formAction);

  const isEditing = formAction === "edit";

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className={`${className} relative w-[32rem] px-8 py-4 rounded-xl bg-white text-slate-500`}
      >
        <button
          className="absolute top-5 right-6 text-red-400 hover:text-red-500"
          onClick={onClose}
        >
          <MdOutlineClose size={28} />
        </button>
        <div className="text-center text-2xl mb-4">{`${
          isEditing ? "Edit" : "Add"
        } ${title}`}</div>
        <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
          {children}
          <div className="col-span-2 place-self-end">
            <button
              className="outline outline-1 outline-blue-500 px-3 py-2 rounded-lg text-lg text-blue-500 mr-4
                  hover:outline-blue-600 hover:text-blue-600"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="btn-primary w-20">
              {isEditing ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
