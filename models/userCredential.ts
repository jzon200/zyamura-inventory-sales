import { model, models, Schema } from "mongoose";

type UserCredential = {
  username: string;
  password: string;
};

const userCredentialSchema = new Schema<UserCredential>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default models.User || model("User", userCredentialSchema);
