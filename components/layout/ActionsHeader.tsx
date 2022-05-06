import { MdAdd, MdFilterList } from "react-icons/md";
import Dropdown from "../UI/Dropdown";
import TitleHeader from "./TitleHeader";

type Props = {
  title: string;
  className?: string;
  onAddHandler: () => void;
  // TODO: searchHandler & dropdownHandler
};

const ActionsHeader = ({ title, className, onAddHandler }: Props) => {
  return (
    <div className={`flex justify-between items-center text-lg ${className}`}>
      <TitleHeader className="basis-48" title={title} />
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
        <Dropdown />
        {/* Add Items */}
        <button
          onClick={onAddHandler}
          className="btn-rounded max-h-14 bg-[#887F61] basis-48 text-yellow-50"
        >
          <div>Add Items</div>
          <MdAdd size={24} />
        </button>
      </div>
    </div>
  );
};

export default ActionsHeader;
