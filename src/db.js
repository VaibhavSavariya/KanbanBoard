import mongoose from "mongoose";

const connect = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connnected", () => {
      console.log("Mongo Connect Successfully!");
    });
    connection.on("error", (err) => {
      console.log(
        "Mongo Connection Error, Please make sure Mongo is running",
        err
      );
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};

export default connect;
