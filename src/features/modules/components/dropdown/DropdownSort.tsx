import { QueryConstraint } from "firebase/firestore";
import { motion, Variants } from "framer-motion";
import { MouseEvent, useCallback, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

import { useAppDispatch } from "../../../../redux/hooks";
import { setSortQuery } from "../../store/reducers/firestoreReducer";
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

export default function DropdownSort({ items }: Props) {
  const values = Object.values(items);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(values.length - 1);

  const dispatch = useAppDispatch();

  function handleToggleDropdown(event: MouseEvent) {
    // This prevents propagating the event listener passed to the Document below
    event.stopPropagation();

    if (!isExpanded) {
      document.addEventListener("click", handleShrinkOutside);
    } else {
      document.removeEventListener("click", handleShrinkOutside);
    }

    setIsExpanded(!isExpanded);
  }

  /**
   * Shrinks the dropdown when clicked on empty space.
   * Wraps to useCallback to memoized for every re-render,
   * and improve performance.
   */
  const handleShrinkOutside = useCallback(() => {
    setIsExpanded(false);
    document.removeEventListener("click", handleShrinkOutside);
  }, []);

  const dropdownItems = values.map((item, index) => (
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
  ));

  return (
    <motion.div className="relative w-72">
      <motion.button
        variants={dropdownBtnVariants}
        animate={isExpanded ? "expand" : "shrink"}
        className="btn-rounded-between bg-[#D1CEB2] w-full"
        initial={"shrink"}
        onClick={handleToggleDropdown}
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
        {dropdownItems}
      </motion.ul>
    </motion.div>
  );
}
