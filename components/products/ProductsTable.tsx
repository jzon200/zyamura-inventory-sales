import { DocumentData } from "firebase/firestore";
import { FC } from "react";
import TableGrid from "../layout/TableGrid";
import ProductsRowData from "./ProductsRowData";

type Props = {
  productsList: InputValues[] | DocumentData[];
};

const ProductsTable: FC<Props> = (props) => {
  return (
    <TableGrid className="mt-16 text-[#3A512B] text-xl">
      {/* Header */}
      <div>{/* Empty Column */}</div>
      <div className="table-header">ID</div>
      <div className="table-header">NAME</div>
      <div className="table-header">CATEGORY</div>
      <div className="table-header">QUANTITY</div>
      <div className="table-header">PRICE</div>
      <div className="table-header">ACTION</div>
      {/* Items */}
      {props.productsList.map((product: InputValues | DocumentData) => (
        <ProductsRowData key={product.id} data={product} />
      ))}
    </TableGrid>
  );
};

export default ProductsTable;
