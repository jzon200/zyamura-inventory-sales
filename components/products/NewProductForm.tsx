import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FC, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { SubmitHandler, useForm } from "react-hook-form";
import { db, storage } from "../../lib/firebase";
import Input from "../UI/Input";

const NewProductForm: FC = (props) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploadFile, uploading, snapshot] = useUploadFile();
  const { register, handleSubmit, watch } = useForm<IFormValues>();

  const submitHandler: SubmitHandler<IFormValues> = async (productData) => {
    console.log(productData);

    const storageRef = ref(storage, `products/images/${selectedFile?.name}`);
    if (selectedFile) {
      const result = await uploadFile(storageRef, selectedFile, {
        contentType: "image/jpeg",
      });
      console.log(`Result: ${JSON.stringify(result)}`);
    }

    const imageUrl = await getDownloadURL(storageRef);

    const productsCollectionRef = collection(db, "products");

    await addDoc(productsCollectionRef, { ...productData, Image: imageUrl })
      .then(() => console.log("success"))
      .catch((error) => console.log(error.message));
  };

  console.log(watch("Item Name"));

  return (
    <div className="ml-auto mt-24 mr-20 px-8 py-4 w-[32rem] rounded-xl bg-white text-slate-500">
      <div className="text-center text-2xl mb-4">Add Items</div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Item Name"
            id="itemName"
            placeholder="Enter Item Name"
            required
            register={register}
          />
          <div className="flex gap-2">
            <Input
              id="age"
              label="Age"
              type="number"
              className="w-full"
              placeholder="year"
              register={register}
            />
            <Input
              label="Age"
              className="w-full"
              type="number"
              placeholder="month"
              register={register}
            />
          </div>

          <Input
            id="category"
            label="Category"
            placeholder="Fish"
            register={register}
          />
          <Input
            type="number"
            id="price"
            label="Price"
            defaultValue={0}
            register={register}
          />

          <Input
            className="file-input w-full text-sm"
            type="file"
            id="image"
            label="Image"
            register={register}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : undefined;
              console.log(file?.name);
              setSelectedFile(file);
            }}
          />
          <Input
            id="quantity"
            label="Quantity"
            className=""
            type="number"
            defaultValue={1}
            register={register}
          />

          <button className="col-span-2 place-self-end btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;