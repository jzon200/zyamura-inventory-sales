import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

const TableGrid = ({ className, children }: Props) => {
  return (
    <div
      className={`grid grid-cols-7 gap-y-8 place-items-center select-none ${className}`}
    >
      {children}
    </div>
  );
};

export default TableGrid;
