import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FC, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { db, storage } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setShowEditDialog } from "../../redux-store/slices/productsSlice";
import CircularProgressCentered from "../UI/CircularProgressCentered";
import Input from "../UI/Input";

const EditProductForm: FC = () => {
  const product = useAppSelector((state) => state.products.product);

  const [imageUrl, setImageUrl] = useState<string | null>(product?.imageUrl);
  const [itemType, setItemType] = useState<"individual" | "collective">(
    product!.itemType
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadFile, uploading, snapshot] = useUploadFile();

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputValues>();

  const submitHandler: SubmitHandler<InputValues> = async (productData) => {
    setIsLoading(true);
    console.log(productData);

    const { name, category, price, description, quantity, year, month } =
      productData;

    const productDocRef = doc(db, "products", product?.docId);

    await updateDoc(productDocRef, {
      name,
      description,
      category,
      price,
      quantity: !quantity ? null : quantity,
      year: !year ? null : year,
      month: !month ? null : month,
      imageUrl,
      itemType,
      dateModified: serverTimestamp(),
    })
      .then(() => console.log("success"))
      .catch((error) => console.log(error.message));

    setIsLoading(false);
    dispatch(setShowEditDialog(false));
    reset();
  };

  console.log(watch());

  let imgContent = (
    <img
      className="rounded-lg mr-1 min-w-[69px] max-h-[64px] ring ring-slate-400 bg-slate-400 object-cover"
      src={imageUrl!}
    />
  );

  if (isUploading) {
    imgContent = (
      <div className="rounded-lg w-40 bg-slate-400 grid place-items-center">
        <CircularProgress size={24} />
      </div>
    );
  } else if (imageUrl) {
    imgContent = (
      <img
        className="rounded-lg mr-1 min-w-[69px] max-h-[64px] ring ring-slate-400 bg-slate-400 object-cover"
        src={imageUrl!}
      />
    );
  } else {
    imgContent = <div className="rounded-lg w-40 bg-slate-400" />;
  }

  if (isLoading) return <CircularProgressCentered />;

  return (
    <div className="absolute top-1/4 right-1/3 w-[32rem] px-8 py-4 rounded-xl bg-white text-slate-500">
      <div className="text-center text-2xl mb-4">Edit Item: #{product!.id}</div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Item Name *"
            id="itemName"
            placeholder="Enter Item Name"
            required
            autoFocus
            inputValue="name"
            register={register}
            defaultValue={product?.name}
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
            defaultValue={product?.price}
          />

          {/* Select Category */}
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="form-control px-2"
              defaultValue={product?.category}
              {...register("category")}
            >
              <option value="fish">Fish</option>
              <option value="dog">Dog</option>
              <option value="materials">Materials</option>
              <option value="food">Food</option>
              <option value="other">Define New</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div>
              <label htmlFor="imgUpload">Image</label>
              <input
                id="imgUpload"
                className="form-control upload-input w-[138px]"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const imgPath = e.target.files
                    ? e.target.files[0]
                    : undefined;
                  if (imgPath) {
                    const storageRef = ref(
                      storage,
                      `products/images/${imgPath?.name}`
                    );
                    setIsUploading(true);
                    await uploadFile(storageRef, imgPath);
                    const imgUrl = await getDownloadURL(storageRef);
                    setImageUrl(imgUrl);
                    setIsUploading(false);
                  }
                }}
              />
            </div>
            {imgContent}
          </div>

          <div>
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
          </div>

          {itemType === "individual" && (
            <div>
              <label htmlFor="age">Age</label>
              <div className="flex gap-2">
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="age"
                      type="number"
                      label="year"
                      variant="outlined"
                      size="small"
                      defaultValue={product?.year}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="month"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      label="month"
                      variant="outlined"
                      size="small"
                      defaultValue={product?.month}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          )}

          {itemType === "collective" && (
            <Input
              id="quantity"
              label="Quantity"
              className=""
              type="number"
              placeholder="2"
              valueAsNumber
              inputValue="quantity"
              defaultValue={product?.quantity}
              register={register}
            />
          )}

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="-mt-4 col-span-2 p-2 rounded-lg border-2 border-gray-400 text-black focus:outline-none focus:border-blue-500"
            rows={4}
            placeholder="Enter some text..."
            defaultValue={product?.description}
            {...register("description")}
          ></textarea>

          <button className="col-span-2 place-self-end btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
