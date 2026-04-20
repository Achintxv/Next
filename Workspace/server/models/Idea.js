import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Idea", ideaSchema);