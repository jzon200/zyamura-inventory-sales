import mongoose from "mongoose";

async function dbConnect() {
  return await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.t1uen.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
}

export default dbConnect;
