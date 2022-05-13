import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { SubmitHandler, useForm } from "react-hook-form";
import imgPlaceholder from "../../assets/image_placeholder.svg";
import { db, storage } from "../../lib/firebase";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { setShowAddDialog } from "../../redux-store/slices/employeesSlice";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import Input from "../UI/Input";

const AddEmployeeForm = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadFile] = useUploadFile();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, watch, reset } = useForm<InputValues>();

  const submitHandler: SubmitHandler<InputValues> = async (data) => {
    setIsLoading(true);
    console.log(data);

    const { firstName, lastName, contactNumber, email, role } = data;

    const employeesCollectionRef = collection(db, "employees");

    const id = Math.floor(Math.random() * 1000000);

    await addDoc(employeesCollectionRef, {
      id,
      firstName,
      lastName,
      contactNumber,
      email,
      role,
      imageUrl,
      dateAdded: serverTimestamp(),
      dateModified: serverTimestamp(),
    })
      .then(() => console.log("success"))
      .catch((error) => console.log(error.message));

    setIsLoading(false);
    dispatch(setShowAddDialog(false));
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

  if (isLoading) return <CircularProgressCentered className="h-full" />;

  return (
    <div className="absolute top-32 right-28 w-[32rem] px-8 py-4 rounded-xl bg-white text-slate-500">
      <div className="text-center text-2xl mb-4">Add Employee</div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name *"
            id="firstName"
            placeholder="Enter First Name"
            required
            autoFocus
            inputValue="firstName"
            register={register}
          />
          <Input
            label="Last Name *"
            id="lastName"
            placeholder="Enter Last Name"
            required
            inputValue="lastName"
            register={register}
          />
          <Input
            id="contactNumber"
            label="Contact Number *"
            placeholder="09123456789"
            inputValue="contactNumber"
            required
            register={register}
          />
          <Input
            type="email"
            label="Email *"
            id="email"
            required
            inputValue="email"
            register={register}
          />
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="form-control px-2"
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

          <button className="col-span-2 place-self-end btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
