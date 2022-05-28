import { QueryConstraint } from "firebase/firestore";
import { MdAdd, MdFilterList } from "react-icons/md";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { showAddForm } from "../../redux-store/slices/uiSlice";
import Dropdown from "../UI/Dropdown";
import TitleHeader from "./TitleHeader";

type Props = {
  title: string;
  addLabel?: string;
  className?: string;
  sortItems: Record<
    string,
    { label: string; queryConstraint: QueryConstraint }
  >;
};

// TODO: Implement Search Functionality
const ActionsHeader = ({
  title,
  className,
  sortItems,
  addLabel = "Items",
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className={`flex justify-between items-center text-lg ${className}`}>
      <TitleHeader className="basis-52" title={title} />
      {/* Search */}
      <div className="w-full flex justify-end gap-8">
        <div className="basis-96 flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="max-h-14 w-full rounded-l-2xl p-4"
          />
          <button className="flex items-center gap-2 px-4 py-[14px] rounded-r-2xl font-medium bg-[#D1CEB2]">
            Filters
            <MdFilterList size={24} />
          </button>
        </div>
        {/* <SortProducts /> */}
        <Dropdown items={sortItems} />
        {/* Add Items */}
        <button
          onClick={() => {
            dispatch(showAddForm());
          }}
          className="btn-rounded max-h-14 bg-[#887F61] basis-48 text-yellow-50"
        >
          <div>Add {addLabel}</div>
          <MdAdd size={24} />
        </button>
      </div>
    </div>
  );
};

export default ActionsHeader;
