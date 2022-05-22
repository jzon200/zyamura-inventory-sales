import { DocumentData } from "firebase/firestore";
import { ReactNode } from "react";

type Props = {
  items: object[] | DocumentData;
  className?: string;
  children: ReactNode;
};

{
  /* <div className="overflow-y-scroll py-8 h-5/6">
  <div className="grid grid-cols-7 gap-y-8 place-items-center  text-[#3A512B] text-xl">
    {products.map((product: Product) => (
      <ProductsRowData key={product.docId} product={product} />
    ))}
  </div>
</div>; */
}

const TableGrid = ({ items, className, children }: Props) => {
  return (
    <div className="overflow-y-scroll py-8 h-5/6">
      <div
        className={`grid grid-cols-${items.length} gap-y-8 place-items-center  ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default TableGrid;
