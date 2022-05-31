import { QueryConstraint } from "firebase/firestore";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useAppDispatch } from "../../redux/hooks";
import { setSortQuery } from "../../redux/slices/firestoreSlice";
import DropdownItem from "./DropdownItem";

type Props = {
  items: Record<string, { label: string; sortQuery: QueryConstraint }>;
};

const dropdownBtnVariants: Variants = {
  expand: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: {
      duration: 0.3,
    },
  },
  shrink: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
};

const expandBtnVariants: Variants = {
  expand: {
    rotate: 180,
    transition: { type: "tween", ease: "easeInOut", duration: 0.3 },
  },
  shrink: {
    rotate: [180, 0],
    transition: { type: "tween", ease: "easeInOut", duration: 0.3 },
  },
};

const contentVariants: Variants = {
  expand: {
    height: "auto",
    overflow: "visible",
  },
  shrink: {
    height: 0,
    overflow: "hidden",
  },
};

// TODO: Fixed the Local State
const SortDropdown = ({ items }: Props) => {
  const values = Object.values(items);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(values.length - 1);

  const dispatch = useAppDispatch();

  return (
    <motion.div className="relative w-72">
      <motion.button
        variants={dropdownBtnVariants}
        animate={isExpanded ? "expand" : "shrink"}
        className="btn-rounded-between bg-[#D1CEB2] w-full"
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
        <motion.div
          variants={expandBtnVariants}
          animate={isExpanded ? "expand" : "shrink"}
          initial={false}
        >
          <MdOutlineArrowDropDown size={24} />
        </motion.div>
      </motion.button>
      {/* Dropdown Items */}
      <motion.ul
        variants={contentVariants}
        animate={isExpanded ? "expand" : "shrink"}
        className="absolute rounded-b-3xl w-full z-30 shadow-md"
        initial={false}
      >
        {values.map((item, index) => (
          <DropdownItem
            key={index}
            label={item.label}
            isSelected={selectedIndex === index}
            onClick={() => {
              dispatch(setSortQuery(item.sortQuery));
              setSelectedIndex(index);
              setIsExpanded(false);
            }}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default SortDropdown;
