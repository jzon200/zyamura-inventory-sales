import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import imgPlaceholder from "../../assets/image_placeholder.svg";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  addDocumentData,
  editDocumentData,
} from "../../redux-store/slices/firestoreSlice";
import { setShowFormModal } from "../../redux-store/slices/uiSlice";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import EntryForm from "../UI/EntryForm";
import Input from "../UI/Input";
import SelectMenu from "../UI/SelectMenu";

const ROLE_ITEMS: Role[] = ["admin", "cashier", "manager", "other"];

const EmployeeEntryForm = () => {
  const { selectedEmployee, formAction, showLoadingSpinner } = useAppSelector(
    (state) => ({
      selectedEmployee: state.firestore.selectedDocument,
      formAction: state.ui.formAction,
      showLoadingSpinner: state.ui.showLoadingSpinner,
    })
  );

  const [imageUrl, setImageUrl] = useState<string | null>(
    selectedEmployee?.imageUrl ? selectedEmployee.imageUrl : null
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
      dispatch(
        editDocumentData(data, "employees", selectedEmployee, imagePath)
      );
    } else {
      dispatch(addDocumentData(data, "employees", imagePath));
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
      title="Employee"
      onClose={() => dispatch(setShowFormModal(false))}
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        label="First Name *"
        id="firstName"
        placeholder="Enter First Name"
        required
        autoFocus
        defaultValue={selectedEmployee?.firstName}
        inputValue="firstName"
        register={register}
        error={errors.firstName}
      />
      <Input
        label="Last Name *"
        id="lastName"
        placeholder="Enter Last Name"
        required
        defaultValue={selectedEmployee?.lastName}
        inputValue="lastName"
        register={register}
        error={errors.lastName}
      />

      <Input
        type="number"
        id="contactNumber"
        label="Contact Number *"
        placeholder="09123456789"
        inputValue="contactNumber"
        valueAsNumber
        required
        defaultValue={selectedEmployee?.contactNumber}
        register={register}
        error={errors.contactNumber}
      />
      <Input
        type="email"
        label="Email *"
        id="email"
        placeholder="Enter Email"
        required
        inputValue="email"
        defaultValue={selectedEmployee?.email}
        register={register}
        error={errors.email}
      />

      <SelectMenu
        items={ROLE_ITEMS}
        id="role"
        label="Role"
        inputValue="role"
        register={register}
        defaultValue={selectedEmployee?.role}
      />
      {/* Image File Upload */}
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
    </EntryForm>
  );
};

export default EmployeeEntryForm;
