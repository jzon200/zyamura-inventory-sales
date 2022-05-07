import { useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { setSortQuery } from "../../redux-store/slices/productsSlice";
import DropdownItem from "./DropdownItem";

// const items: ProductQuery[] = [
//   {
//     sort: "nameAsc",
//     label: "Name A-Z",
//   },
//   {
//     sort: "nameDesc",
//     label: "Name Z-A",
//   },
//   {
//     sort: "priceAsc",
//     label: "Lowest Price",
//   },
//   {
//     sort: "priceDesc",
//     label: "Highest Price",
//   },
//   {
//     sort: "quantityAsc",
//     label: "Lowest Quantity",
//   },
//   {
//     sort: "quantityDesc",
//     label: "Highest Quantity",
//   },
//   {
//     sort: "latest",
//     label: "Latest",
//   },
// ];

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
    <div className="relative basis-72 select-none">
      <button
        className={`btn-rounded bg-[#D1CEB2] w-full ${
          isExpanded && "rounded-b-none"
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
        {isExpanded ? (
          <MdOutlineArrowDropUp size={24} />
        ) : (
          <MdOutlineArrowDropDown size={24} />
        )}
      </button>
      {/* Dropdown Items */}
      {isExpanded && (
        <ul className="absolute rounded-b-3xl shadow-md w-full bg-white">
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
      )}
    </div>
  );
};

export default Dropdown;
