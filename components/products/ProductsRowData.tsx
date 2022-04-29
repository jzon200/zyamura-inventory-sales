import { DocumentData } from "firebase/firestore";
import { FC, Fragment } from "react";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";

type Props = {
  data: InputValues | DocumentData;
};

const ProductsRowData: FC<Props> = (props) => {
  const { id, name, category, imageUrl, price, quantity } = props.data;

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
        <button>
          <MdOutlineClose />
        </button>
      </div>
    </Fragment>
  );
};

export default ProductsRowData;
