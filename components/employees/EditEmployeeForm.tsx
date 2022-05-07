import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { SubmitHandler, useForm } from "react-hook-form";
import imgPlaceholder from "../../assets/image_placeholder.svg";
import { db, storage } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setShowEditDialog } from "../../redux-store/slices/employeesSlice";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import Input from "../UI/Input";

const EditEmployeeForm = () => {
  const employee = useAppSelector((state) => state.employees.employee);

  const [imageUrl, setImageUrl] = useState<string | null>(employee?.imageUrl);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadFile] = useUploadFile();

  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, reset } = useForm<InputValues>();

  const submitHandler: SubmitHandler<InputValues> = async (data) => {
    setIsLoading(true);
    console.log(data);

    const { firstName, lastName, contactNumber, email, role } = data;

    const employeeDocRef = doc(db, "employees", employee?.docId);

    await updateDoc(employeeDocRef, {
      firstName,
      lastName,
      contactNumber,
      email,
      role,
      imageUrl,
      dateModified: serverTimestamp(),
    })
      .then(() => console.log("success"))
      .catch((error) => console.log(error.message));

    setIsLoading(false);
    dispatch(setShowEditDialog(false));
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

  console.log(watch());

  if (isLoading) return <CircularProgressCentered />;

  return (
    <div className="absolute top-1/4 right-1/3 w-[32rem] px-8 py-4 rounded-xl bg-white text-slate-500">
      <div className="text-center text-2xl mb-4">Edit Employee</div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name *"
            id="firstName"
            placeholder="Enter First Name"
            required
            inputValue="firstName"
            autoFocus
            register={register}
            defaultValue={employee?.firstName}
          />
          <Input
            label="Last Name *"
            id="lastName"
            placeholder="Enter Last Name"
            required
            inputValue="lastName"
            register={register}
            defaultValue={employee?.lastName}
          />
          <Input
            id="contactNumber"
            label="Contact Number *"
            placeholder="09123456789"
            inputValue="contactNumber"
            required
            register={register}
            defaultValue={employee?.contactNumber}
          />
          <Input
            type="email"
            label="Email *"
            id="email"
            required
            inputValue="email"
            register={register}
            defaultValue={employee?.email}
          />
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="form-control px-2"
              defaultValue={employee?.role}
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
                  quality={100}
                  alt=""
                />
              )}
            </div>
          </div>

          <button className="col-span-2 place-self-end btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
