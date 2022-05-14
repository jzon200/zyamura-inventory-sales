import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { SubmitHandler, useForm } from "react-hook-form";
import imgPlaceholder from "../../assets/image_placeholder.svg";
import { db, storage } from "../../lib/firebase";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import { setShowAddDialog } from "../../redux-store/slices/productsSlice";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import Input from "../UI/Input";

const AddProductForm = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [itemType, setItemType] = useState<ItemType>("individual");

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
      itemType,
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

  if (isLoading) return <CircularProgressCentered className="h-full" />;

  return (
    <div className="absolute top-32 right-28 w-[32rem] px-8 py-4 rounded-xl bg-white text-slate-500">
      <div className="text-center text-2xl mb-4">Add Items</div>
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

          {/* <div>
            <label>Item Type</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setItemType("individual")}
                className={`chip ${
                  itemType === "individual"
                    ? "bg-blue-300 text-blue-50"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                individual
              </button>
              <button
                type="button"
                onClick={() => setItemType("collective")}
                className={`chip w-full ${
                  itemType === "collective"
                    ? "bg-blue-300 text-blue-50"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                collective
              </button>
            </div>
          </div> */}
          <Input
            id="quantity"
            label="Quantity"
            type="number"
            valueAsNumber
            inputValue="quantity"
            // disabled={itemType === "individual"}
            defaultValue={1}
            register={register}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="-mt-4 col-span-2 p-2 rounded-lg border-2 border-gray-400 text-black focus:outline-none focus:border-blue-500"
            rows={4}
            placeholder={"Enter details such as age, size, etc."}
            maxLength={500}
            {...register("description")}
          />

          <button className="col-span-2 place-self-end btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
