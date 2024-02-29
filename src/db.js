import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb://vaibhav:vaibhav1312@ac-r6kfvxo-shard-00-00.0tm31b4.mongodb.net:27017,ac-r6kfvxo-shard-00-01.0tm31b4.mongodb.net:27017,ac-r6kfvxo-shard-00-02.0tm31b4.mongodb.net:27017/?ssl=true&replicaSet=atlas-jdudka-shard-0&authSource=admin&retryWrites=true&w=majority&appName=KanbanCluster"
    );

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with a non-zero status code
  }
};

export default connect;
