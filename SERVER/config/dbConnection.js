import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_URL
    );

    if (connection) {
      console.log(`Connection to mongodb: ${connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;
