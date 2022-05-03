import { FC, useEffect, useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setProductQuery } from "../../redux-store/slices/productsSlice";
import DropdownItem from "./DropdownItem";

const items: ProductQuery[] = [
  {
    sort: "nameAsc",
    label: "Name A-Z",
    queryConstraint: "name",
  },
  {
    sort: "nameDesc",
    label: "Name Z-A",
    queryConstraint: "name",
    descending: true,
  },
  {
    sort: "priceAsc",
    label: "Lowest Price",
    queryConstraint: "price",
  },
  {
    sort: "priceDesc",
    label: "Highest Price",
    queryConstraint: "price",
    descending: true,
  },
  {
    sort: "quantityAsc",
    label: "Lowest Quantity",
    queryConstraint: "quantity",
  },
  {
    sort: "quantityDesc",
    label: "Highest Quantity",
    queryConstraint: "quantity",
    descending: true,
  },
  {
    sort: "latest",
    label: "Latest",
    queryConstraint: "dateAdded",
    descending: true,
  },
];

const Dropdown: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedQuery = useAppSelector((state) => state.products.productQuery);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("onMount");
  });

  return (
    <div className="relative basis-72 select-none z-10">
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
      {/* Dropdown */}
      {isExpanded && (
        <ul className="absolute rounded-b-3xl shadow-md w-full bg-white">
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              label={item.label}
              isSelected={selectedQuery.label === item.label}
              onClick={() => {
                dispatch(setProductQuery(item.sort));
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
