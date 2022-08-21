import { createElement } from "react";
import type { IconType } from "react-icons";

type Props = {
  icon: IconType;
  text: string;
  className?: string;
  onClick: () => void;
};

export default function ActionItem({ icon, text, className, onClick }: Props) {
  return (
    <div
      className={`flex gap-4 justify-between items-center p-3 font-nunito ${className} hover:bg-zinc-300`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}>
      {createElement(icon)}
      <div>{text}</div>
    </div>
  );
}
