import { QueryConstraint } from "firebase/firestore";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useAppDispatch } from "../../redux/hooks";
import { setSortQuery } from "../../redux/slices/firestoreSlice";
import DropdownItem from "./DropdownItem";

type Props = {
  items: Record<string, { label: string; queryConstraint: QueryConstraint }>;
};

const SortDropdown = ({ items }: Props) => {
  const values = Object.values(items);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(values.length - 1);

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
          <span>Sort by </span>
          <span className="font-medium text-[#13240D]">
            {values[selectedIndex].label}
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
      <motion.ul
        animate={{
          height: isExpanded ? "auto" : 0,
          overflow: isExpanded ? "visible" : "hidden",
        }}
        className="absolute rounded-b-3xl w-full z-30 shadow-md"
      >
        {values.map((item, index) => (
          <DropdownItem
            key={index}
            label={item.label}
            isSelected={selectedIndex === index}
            onClick={() => {
              dispatch(setSortQuery(item.queryConstraint));
              setSelectedIndex(index);
              setIsExpanded(false);
            }}
          />
        ))}
      </motion.ul>
    </div>
  );
};

export default SortDropdown;
