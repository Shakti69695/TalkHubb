import mongoose from "mongoose";

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

export default connection;
