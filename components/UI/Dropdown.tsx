import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { setSortQuery } from "../../redux-store/slices/productsSlice";
import DropdownItem from "./DropdownItem";

type Props = {
  items: ProductQuery[];
  selectedQuery: ProductQuery;
  // onSortHandler: () => void;
  // onSortHandler: (sortQuery: SortQuery) => void;
};

const Dropdown = ({ items, selectedQuery }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const selectedQuery = useAppSelector((state) => state.products.productQuery);
  const dispatch = useAppDispatch();

  return (
    <div className="relative basis-72">
      <button
        className={`btn-rounded bg-[#D1CEB2] w-full transition-all ${
          isExpanded ? "rounded-b-none duration-300 " : "duration-[1.7s]"
        }`}
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
        }}
      >
        <div>
          Sort by{" "}
          <span className="font-medium text-[#13240D]">
            {selectedQuery.label}
          </span>
        </div>
        <MdOutlineArrowDropDown
          size={24}
          className={`transition-all duration-700 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {/* Dropdown Items */}
      <ul
        className={`absolute rounded-b-3xl w-full z-20 shadow-md transition-all ${
          isExpanded
            ? "h-[26rem] overflow-visible"
            : "duration-700 h-0 overflow-hidden"
        }`}
      >
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            label={item.label}
            isSelected={selectedQuery.label === item.label}
            onClick={() => {
              dispatch(setSortQuery(item.sortQuery));
              // onSortHandler(item.sortQuery);
              setIsExpanded(false);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
