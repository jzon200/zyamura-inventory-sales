import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { FC, Fragment } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import {
  setProduct,
  setShowDeleteDialog,
} from "../../redux-store/slices/productsSlice";

type Props = {
  data: Product | DocumentData;
};

const ProductsRowData: FC<Props> = (props) => {
  const { id, name, category, imageUrl, price, quantity, docId } = props.data;

  const dispatch = useAppDispatch();

  const deleteHandler = async () => {
    dispatch(setProduct(props.data));
    dispatch(setShowDeleteDialog(true));
    // await deleteDoc(doc(db, "products", docId));
  };

  return (
    <Fragment key={id}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          className="rounded-md"
          width={80}
          height={80}
          objectFit={"cover"}
        />
      ) : (
        <div className="h-20 w-20"></div>
      )}
      <div>#{id}</div>
      <div>{name}</div>
      <div>{category}</div>
      {/* <div>{description}</div> */}
      <div>{`${quantity.toLocaleString()}`}</div>
      <div>{`₱${price.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`}</div>
      <div className="flex gap-4">
        <button>
          <FiEdit />
        </button>
        <button onClick={deleteHandler}>
          <MdOutlineClose />
        </button>
      </div>
    </Fragment>
  );
};

export default ProductsRowData;
