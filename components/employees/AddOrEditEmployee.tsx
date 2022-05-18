import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { SubmitHandler, useForm } from "react-hook-form";
import imgPlaceholder from "../../assets/image_placeholder.svg";
import { storage } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  addEmployeeData,
  editEmployeeData,
} from "../../redux-store/slices/employeesSlice";
import { setShowFormModal } from "../../redux-store/slices/uiSlice";
import AddOrEditForm from "../UI/AddOrEditForm";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import Input from "../UI/Input";

const AddOrEditEmployee = () => {
  const { selectedEmployee, formAction, showLoadingSpinner } = useAppSelector(
    (state) => ({
      selectedEmployee: state.employees.selectedEmployee,
      formAction: state.ui.formAction,
      showLoadingSpinner: state.ui.showLoadingSpinner,
    })
  );

  const [imageUrl, setImageUrl] = useState<string | null>(
    selectedEmployee ? selectedEmployee.imageUrl : null
  );

  const [isUploading, setIsUploading] = useState(false);

  const [uploadFile] = useUploadFile();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<InputValues>();

  const submitHandler: SubmitHandler<InputValues> = (data) => {
    if (formAction === "edit") {
      dispatch(editEmployeeData(data, selectedEmployee, imageUrl));
    } else {
      dispatch(addEmployeeData(data, imageUrl));
    }
    reset();
  };

  const uploadImgHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const imgPath = event.target.files ? event.target.files[0] : null;
    if (imgPath) {
      const storageRef = ref(storage, `employees/images/${imgPath?.name}`);
      setIsUploading(true);
      await uploadFile(storageRef, imgPath);
      const imgUrl = await getDownloadURL(storageRef);
      setImageUrl(imgUrl);
      setIsUploading(false);
    }
  };

  if (showLoadingSpinner) return <CircularProgressCentered />;

  return (
    <AddOrEditForm
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
        inputValue="firstName"
        defaultValue={selectedEmployee?.firstName}
        register={register}
      />
      <Input
        label="Last Name *"
        id="lastName"
        placeholder="Enter Last Name"
        required
        inputValue="lastName"
        defaultValue={selectedEmployee?.lastName}
        register={register}
      />
      <Input
        id="contactNumber"
        label="Contact Number *"
        placeholder="09123456789"
        inputValue="contactNumber"
        required
        defaultValue={selectedEmployee?.contactNumber}
        register={register}
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
      />
      <div className="flex flex-col gap-[1px]">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          className="form-control px-2"
          defaultValue={selectedEmployee?.role}
          {...register("role")}
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="cashier">Cashier</option>
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
    </AddOrEditForm>
  );
};

export default AddOrEditEmployee;
