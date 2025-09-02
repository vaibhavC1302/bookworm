import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const cnn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database", cnn.connection.host);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};
