import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mogodb connected successfully");
    });
    connection.on("error", (err) => {
      console.log("mogodb connection error." + err);
    });
  } catch (error) {
    console.log(error);
  }
}
