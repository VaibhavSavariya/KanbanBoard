import mongoose from "mongoose";

const connect = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(
      "mongodb://vaibhav:vaibhav1312@ac-r6kfvxo-shard-00-00.0tm31b4.mongodb.net:27017,ac-r6kfvxo-shard-00-01.0tm31b4.mongodb.net:27017,ac-r6kfvxo-shard-00-02.0tm31b4.mongodb.net:27017/?ssl=true&replicaSet=atlas-jdudka-shard-0&authSource=admin&retryWrites=true&w=majority&appName=KanbanCluster"
    );
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
