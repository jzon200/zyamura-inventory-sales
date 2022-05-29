import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addDocumentData,
  editDocumentData,
} from "../../../redux/actions/firestoreActions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setShowFormModal } from "../../../redux/slices/uiSlice";
import imgPlaceholder from "../../../assets/image_placeholder.svg";
import CircularProgressCentered from "../../common/CircularProgressCentered";
import EntryForm from "../../form/EntryForm";
import Input from "../../form/Input";
import SelectMenu from "../../form/SelectMenu";

const CATEGORY_ITEMS: Category[] = ["fish", "dog", "materials", "other"];

const ProductEntryForm = () => {
  const { selectedProduct, formAction, showLoadingSpinner } = useAppSelector(
    (state) => ({
      selectedProduct: state.firestore.selectedDocument,
      formAction: state.ui.formAction,
      showLoadingSpinner: state.ui.showLoadingSpinner,
    })
  );

  const [imageUrl, setImageUrl] = useState<string | null>(
    selectedProduct?.imageUrl ? selectedProduct.imageUrl : null
  );
  const [imagePath, setImagePath] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputValues>();

  const submitHandler: SubmitHandler<InputValues> = (data) => {
    if (formAction === "edit") {
      dispatch(editDocumentData(data, "products", selectedProduct, imagePath));
    } else {
      dispatch(addDocumentData(data, "products", imagePath));
    }
    reset();
  };

  const uploadImgHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const imgPath = event.target.files ? event.target.files[0] : null;

    if (imgPath) {
      const imgUrl = URL.createObjectURL(imgPath);
      setImageUrl(imgUrl);
      setImagePath(imgPath);
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
        autoFocus
        required
        defaultValue={selectedProduct?.name}
        inputValue="name"
        register={register}
        error={errors.name}
      />

      <Input
        id="quantity"
        label="Quantity *"
        type="number"
        placeholder="1"
        valueAsNumber
        required
        defaultValue={selectedProduct?.quantity}
        inputValue="quantity"
        register={register}
        error={errors.quantity}
      />

      <Input
        type="number"
        id="cost"
        label="Product Cost *"
        placeholder="0.00"
        defaultValue={selectedProduct?.cost}
        valueAsNumber
        required
        inputValue="cost"
        register={register}
        error={errors.cost}
      />
      <Input
        type="number"
        id="price"
        label="Selling Price *"
        placeholder="0.00"
        defaultValue={selectedProduct?.price}
        valueAsNumber
        required
        inputValue="price"
        register={register}
        error={errors.price}
      />

      <SelectMenu
        items={CATEGORY_ITEMS}
        id="category"
        label="Category"
        inputValue="category"
        register={register}
        defaultValue={selectedProduct?.category}
      />
      {/* Image File Upload */}
      {/* TODO: Make It Reusable */}
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
        <div className={`w-full max-w-[4rem] min-h-[64px] h-16`}>
          <Image
            className="rounded-md"
            src={imageUrl !== null ? imageUrl : imgPlaceholder}
            width={480}
            height={480}
            objectFit="cover"
            alt=""
          />
        </div>
      </div>

      <div className="col-span-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="w-full p-2 rounded-lg border-2 border-gray-400 text-black focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder={"Enter details such as age, size, etc."}
          maxLength={500}
          defaultValue={selectedProduct?.description}
          {...register("description")}
        />
      </div>
    </EntryForm>
  );
};

export default ProductEntryForm;
