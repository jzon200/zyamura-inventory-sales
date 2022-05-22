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
        isSelected &&
        "border-l-8 border-primary-light bg-[#737E6D] text-primary-light font-bold"
      } font-nunito px-6 py-4 font-medium cursor-pointer hover:bg-[#737E6D] hover:text-primary-light`}
    >
      <li className={`${isSelected && "-ml-2"} flex gap-4 items-center`}>
        {/* Icon */}

        {createElement(icon, { width: 24 })}
        <a className="-mb-[2px]">{label}</a>
      </li>
    </div>
  );
};

export default SidebarItem;
