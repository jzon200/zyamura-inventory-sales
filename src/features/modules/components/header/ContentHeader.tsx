import { QueryConstraint } from "firebase/firestore";
import { MdAdd, MdFilterList } from "react-icons/md";
import { showAddForm } from "../../../../redux/actions/uiActions";
import { useAppDispatch } from "../../../../redux/hooks";

import DropdownSort from "../dropdown/DropdownSort";
import SectionTitle from "./SectionTitle";

type Props = {
  title: string;
  addLabel?: string;
  className?: string;
  sortItems: Record<string, { label: string; sortQuery: QueryConstraint }>;
};

import React from "react";

export default function ContentHeader({
  title,
  className,
  sortItems,
  addLabel = "Items",
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className={`flex justify-between items-center text-lg ${className}`}>
      <SectionTitle className="basis-52" title={title} />
      {/* Search */}
      <div className="w-full flex justify-end gap-8">
        <div className="basis-96 flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="max-h-14 w-full rounded-l-2xl p-4"
            onChange={(event) => {
              // TODO: Implement Search Functionality
            }}
          />
          <button className="flex items-center gap-2 px-4 py-[14px] rounded-r-2xl font-medium bg-[#D1CEB2]">
            Filters
            <MdFilterList size={24} />
          </button>
        </div>
        {/* <SortProducts /> */}
        <DropdownSort items={sortItems} />
        {/* Add Items */}
        <button
          onClick={() => {
            dispatch(showAddForm());
          }}
          className="btn-rounded-between max-h-14 bg-[#887F61] basis-48 text-yellow-50"
        >
          <div>Add {addLabel}</div>
          <MdAdd size={24} />
        </button>
      </div>
    </div>
  );
}
