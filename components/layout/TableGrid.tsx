import { FC, ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

const TableGrid: FC<Props> = (props) => {
  return (
    <div
      className={`grid grid-cols-7 gap-y-8 place-items-center select-none ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default TableGrid;
