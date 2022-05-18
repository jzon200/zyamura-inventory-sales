import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { SubmitHandler, useForm } from "react-hook-form";
import imgPlaceholder from "../../assets/image_placeholder.svg";
import { storage } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  addProductData,
  editProductData,
} from "../../redux-store/slices/productsSlice";
import { setShowFormModal } from "../../redux-store/slices/uiSlice";
import EntryForm from "../UI/EntryForm";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import Input from "../UI/Input";

const ProductEntryForm = () => {
  const { selectedProduct, formAction, showLoadingSpinner } = useAppSelector(
    (state) => ({
      selectedProduct: state.products.selectedProduct,
      formAction: state.ui.formAction,
      showLoadingSpinner: state.ui.showLoadingSpinner,
    })
  );

  const [imageUrl, setImageUrl] = useState<string | null>(
    selectedProduct ? selectedProduct.imageUrl : null
  );
  const [isUploading, setIsUploading] = useState(false);

  const [uploadFile] = useUploadFile();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputValues>();

  const submitHandler: SubmitHandler<InputValues> = (data) => {
    if (formAction === "edit") {
      dispatch(editProductData(data, selectedProduct, imageUrl));
    } else {
      dispatch(addProductData(data, imageUrl));
    }
    reset();
  };

  const uploadImgHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const imgPath = event.target.files ? event.target.files[0] : null;
    if (imgPath) {
      const storageRef = ref(storage, `products/images/${imgPath?.name}`);
      setIsUploading(true);
      await uploadFile(storageRef, imgPath);
      const imgUrl = await getDownloadURL(storageRef);
      setImageUrl(imgUrl);
      setIsUploading(false);
    }
  };

  if (showLoadingSpinner) return <CircularProgressCentered />;

  return (
    <EntryForm
      title={"Product"}
      onClose={() => dispatch(setShowFormModal(false))}
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        label="Item Name *"
        id="itemName"
        placeholder="Enter Item Name"
        required
        autoFocus
        inputValue="productName"
        register={register}
        defaultValue={selectedProduct?.name}
      />
      <Input
        id="quantity"
        label="Quantity"
        type="number"
        valueAsNumber
        inputValue="quantity"
        register={register}
        defaultValue={selectedProduct ? selectedProduct.quantity : 1}
      />
      <Input
        type="number"
        id="cost"
        label="Product Cost *"
        placeholder="0.00"
        valueAsNumber
        inputValue="cost"
        required
        register={register}
        defaultValue={selectedProduct?.cost}
      />
      <Input
        type="number"
        id="price"
        label="Selling Price *"
        placeholder="0.00"
        valueAsNumber
        inputValue="price"
        required
        register={register}
        defaultValue={selectedProduct?.price}
      />
      {/* Select Category */}
      <div className="flex flex-col gap-[1px]">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          className="form-control px-2"
          defaultValue={selectedProduct?.category}
          {...register("category")}
        >
          <option value="fish">Fish</option>
          <option value="dog">Dog</option>
          <option value="materials">Materials</option>
          <option value="food">Food</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex gap-2">
        <div>
          <label htmlFor="imgUpload">Image</label>
          <input
            id="imgUpload"
            className="form-control upload-input"
            type="file"
            accept="image/*"
            onChange={uploadImgHandler}
          />
        </div>
        <div
          className={`w-full max-w-[4rem] max-h-16 ${
            (imageUrl !== null || isUploading) &&
            "rounded-lg border-2 border-gray-500"
          }`}
        >
          {isUploading ? (
            <CircularProgressCentered size={24} />
          ) : (
            <Image
              className="rounded-md text-blue-500"
              src={imageUrl !== null ? imageUrl : imgPlaceholder}
              width={720}
              height={720}
              objectFit="cover"
              alt=""
            />
          )}
        </div>
      </div>
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        className="-mt-4 col-span-2 p-2 rounded-lg border-2 border-gray-400 text-black focus:outline-none focus:border-blue-500"
        rows={4}
        placeholder={"Enter details such as age, size, etc."}
        maxLength={500}
        defaultValue={selectedProduct?.description}
        {...register("description")}
      />
    </EntryForm>
  );
};

export default ProductEntryForm;
