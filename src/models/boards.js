import mongoose from "mongoose";

const boardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: Number,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    tabs: {
      todos: Array,
      inProgress: Array,
      completed: Array,
    },
  },
  { timestamps: true }
);

const BoardModel =
  mongoose.models.boards || mongoose.model("boards", boardSchema);

export default BoardModel;
