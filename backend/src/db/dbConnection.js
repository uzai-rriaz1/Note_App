import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const response = await mongoose.connect(process.env.DATABASE_URI);
    if (response) console.log("database connected succesfully");
    return response;
  } catch (error) {
    console.log("db connection error", error);
  }
};

export default dbConnection;
