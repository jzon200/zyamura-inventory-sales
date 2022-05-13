import Image from "next/image";
import { Fragment } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import {
  setProduct,
  setShowDeleteDialog,
  setShowEditDialog,
} from "../../redux-store/slices/productsSlice";

type Props = {
  product: Product;
};

const ProductsRowData = ({ product }: Props) => {
  const { id, docId, name, category, imageUrl, price, quantity, itemType } =
    product;

  const dispatch = useAppDispatch();

  const editHandler = () => {
    dispatch(setProduct(product));
    dispatch(setShowEditDialog(true));
  };

  const deleteHandler = () => {
    dispatch(setProduct(product));
    dispatch(setShowDeleteDialog(true));
  };

  return (
    <Fragment>
      {imageUrl ? (
        <div className="w-20">
          <Image
            src={imageUrl}
            className="rounded-md "
            width={720}
            height={720}
            objectFit={"cover"}
            alt=""
          />
        </div>
      ) : (
        <div className="h-20 w-20" />
      )}
      <div>{id}</div>
      <div>{name}</div>
      <div>{category}</div>
      {/* <div>{description}</div> */}
      {itemType === "individual" ? (
        <div className="chip bg-[#C9EBEC] text-[#558DAB]">individual</div>
      ) : (
        <div className="chip bg-[#EFE0C1] text-[#B7995D]">collective</div>
      )}
      <div>{`${quantity?.toLocaleString()}`}</div>
      <div>{`₱${price?.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`}</div>
      <div className="flex gap-4">
        <button title="Edit" onClick={editHandler}>
          <FiEdit />
        </button>
        <button title="Delete" onClick={deleteHandler}>
          <BsTrash />
        </button>
      </div>
    </Fragment>
  );
};

export default ProductsRowData;
