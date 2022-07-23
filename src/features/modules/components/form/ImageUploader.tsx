import { ChangeEvent, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setImagePath } from "../../reducers/formReducer";
import { CustomImage } from "../../../../common/components";

export default function ImageUploader() {
  const selectedDocument = useAppSelector(
    (state) => state.firestore.selectedDocument
  );
  const dispatch = useAppDispatch();

  const [imageUrl, setImageUrl] = useState<string | null>(
    selectedDocument?.imageUrl
  );

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const imgPath = event.target.files ? event.target.files[0] : null;

    if (imgPath) {
      dispatch(setImagePath(imgPath));

      const imgUrl = URL.createObjectURL(imgPath);
      setImageUrl(imgUrl);
    }
  }

  return (
    <div className="flex gap-2">
      <div>
        <label>
          <div>Image</div>
          <input
            className="form-control upload-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>
      <div className="w-full max-w-[4rem] min-h-[64px] h-16">
        <CustomImage imageUrl={imageUrl} />
      </div>
    </div>
  );
}
