import { createElement, FC } from "react";
import { IconType } from "react-icons";

type Props = {
  label: string;
  icon: IconType;
  isSelected: boolean;
  onSelected: () => void;
};

const SidebarItem: FC<Props> = (props) => {
  return (
    <div
      onClick={props.onSelected}
      className={`${
        props.isSelected && "bg-primary-light"
      } py-4 px-8 cursor-pointer select-none hover:bg-primary-light hover:bg-blend-dodge`}
    >
      <li className="flex gap-4 items-center">
        {/* Icon */}
        {createElement(props.icon, { width: 24 })}
        <div>{props.label}</div>
      </li>
    </div>
  );
};

export default SidebarItem;
