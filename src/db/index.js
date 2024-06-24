import mongoose from "mongoose";

const ConnectDB = async () => {
  console.log(process.env.MONGODB_URI);
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(process.env.MONGODB_URI);
    console.log(
      `\n MongoDB conncected !! DB HOST: ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    console.log("MONGODB Connection Error: ", error);
    process.exit(1);
  }
};

export default ConnectDB;
