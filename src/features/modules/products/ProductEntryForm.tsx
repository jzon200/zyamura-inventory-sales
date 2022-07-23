import { SubmitHandler, useForm } from "react-hook-form";

import CircularProgressCentered from "../../../common/components/CircularProgressCentered";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addDocumentData, editDocumentData } from "../actions/firestoreActions";
import { EntryForm, Input, SelectMenu } from "../components/form";
import ImageUploader from "../components/form/ImageUploader";
import { setShowInputForm } from "../reducers/uiReducer";

const CATEGORY_ITEMS: Category[] = ["fish", "dog", "materials", "other"];

export default function ProductEntryForm() {
  const { selectedProduct, isEditing, showLoadingSpinner, imagePath } =
    useAppSelector((state) => ({
      selectedProduct: state.firestore.selectedDocument,
      isEditing: state.form.isEditing,
      imagePath: state.form.imagePath,
      showLoadingSpinner: state.ui.showLoadingSpinner,
    }));

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputValues>();

  const submitHandler: SubmitHandler<InputValues> = (data) => {
    if (isEditing) {
      dispatch(editDocumentData(data, "products", selectedProduct, imagePath));
    } else {
      dispatch(addDocumentData(data, "products", imagePath));
    }
    reset();
  };

  if (showLoadingSpinner) return <CircularProgressCentered />;

  return (
    <EntryForm
      title={"Product"}
      onClose={() => dispatch(setShowInputForm(false))}
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
      <ImageUploader />

      <div className="col-span-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-textarea"
          rows={4}
          placeholder={"Enter details such as age, size, etc."}
          maxLength={500}
          defaultValue={selectedProduct?.description}
          {...register("description")}
        />
      </div>
    </EntryForm>
  );
}
