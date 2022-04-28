import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { FC, Fragment } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import dogPic from "../../assets/chow_chow.png";
import fishPic from "../../assets/fish.png";
import TableGrid from "../layout/TableGrid";

const ProductsTable: FC<{ productsList: IFormValues[] | DocumentData[] }> = (
  props
) => {
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
      {props.productsList.map((product: DocumentData) => (
        <Fragment>
          <Image
            src={product.Image}
            className="rounded-md"
            width={80}
            height={80}
            objectFit={"cover"}
          />
          <div>{product.id.substring(0, 5).toUpperCase()}</div>
          <div>{product["Item Name"]}</div>
          <div>{product.Category}</div>
          {/* <div>{product.Age}</div> */}
          <div>{product.Quantity}</div>
          <div>{`${product.Price.toLocaleString()}`}</div>
          <div className="flex gap-4">
            <button>
              <FiEdit />
            </button>
            <button>
              <MdOutlineClose />
            </button>
          </div>
        </Fragment>
      ))}
    </TableGrid>
  );
};

export default ProductsTable;
