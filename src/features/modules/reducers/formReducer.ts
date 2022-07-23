import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  imagePath: File | null;
  isEditing: boolean;
};

const initialState: FormState = {
  imagePath: null,
  isEditing: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setImagePath(state: FormState, action: PayloadAction<File>) {
      state.imagePath = action.payload;
    },
    setIsEditing(state: FormState, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
  },
});

export const { setImagePath, setIsEditing } = formSlice.actions;

const formReducer = formSlice.reducer;

export default formReducer;
