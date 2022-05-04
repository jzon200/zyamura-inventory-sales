import { createElement } from "react";
import { IconType } from "react-icons";

type Props = {
  label: string;
  icon: IconType;
  isSelected: boolean;
  onSelected: () => void;
};

const SidebarItem = ({ label, icon, isSelected, onSelected }: Props) => {
  return (
    <div
      onClick={onSelected}
      className={`${
        isSelected && "bg-primary-light text-primary-dark"
      } px-6 py-4 font-medium cursor-pointer select-none hover:bg-primary-light hover:text-primary-dark`}
    >
      <li className="flex gap-4 items-center">
        {/* Icon */}
        {createElement(icon, { width: 24 })}
        <div>{label}</div>
      </li>
    </div>
  );
};

export default SidebarItem;
