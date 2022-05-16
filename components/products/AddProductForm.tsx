import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import imgPlaceholder from "../../assets/image_placeholder.svg";
import { db, storage } from "../../lib/firebase";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { setShowAddDialog } from "../../redux-store/slices/productsSlice";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import Input from "../UI/Input";

const AddProductForm = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadFile] = useUploadFile();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputValues>();

  const submitHandler: SubmitHandler<InputValues> = async (data) => {
    setIsLoading(true);
    console.log(data);

    const {
      productName: name,
      category,
      price,
      description,
      quantity,
      cost,
    } = data;

    const productsCollectionRef = collection(db, "products");

    const id = Math.floor(Math.random() * 1000000);

    await addDoc(productsCollectionRef, {
      id,
      name,
      description,
      category,
      price,
      cost,
      quantity: !quantity ? 1 : quantity,
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
      const storageRef = ref(storage, `products/images/${imgPath?.name}`);
      setIsUploading(true);
      await uploadFile(storageRef, imgPath);
      const imgUrl = await getDownloadURL(storageRef);
      setImageUrl(imgUrl);
      setIsUploading(false);
    }
  };

  if (isLoading) return <CircularProgressCentered />;

  return (
    <div className="absolute top-24 right-14 w-[32rem] px-8 py-4 rounded-xl bg-white text-slate-500">
      <div className="flex justify-center items-center mb-4">
        <div className="ml-44 text-2xl">Add Items</div>
        <button
          className="ml-auto pt-2 text-gray-500 hover:text-gray-700"
          onClick={() => dispatch(setShowAddDialog(false))}
        >
          <MdOutlineClose size={24} />
        </button>
      </div>
      {/* TODO: Add Error Validation Helpers */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Item Name *"
            id="itemName"
            placeholder="Enter Item Name"
            required
            autoFocus
            inputValue="productName"
            register={register}
          />
          <Input
            id="quantity"
            label="Quantity"
            type="number"
            valueAsNumber
            inputValue="quantity"
            defaultValue={1}
            register={register}
          />

          <Input
            type="number"
            id="cost"
            label="Cost *"
            placeholder="0.00"
            valueAsNumber
            inputValue="cost"
            required
            register={register}
          />
          <Input
            type="number"
            id="price"
            label="Price *"
            placeholder="0.00"
            valueAsNumber
            inputValue="price"
            required
            register={register}
          />

          {/* Select Category */}
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="form-control px-2"
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
            {...register("description")}
          />

          <button className="col-span-2 place-self-end btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
