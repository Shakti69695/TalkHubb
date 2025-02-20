import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB is connected boss");
  } catch (err) {
    console.error("error is in DB boss", err);
  }
};

export default connection;
