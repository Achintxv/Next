import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
      default: "OPEN",
    },
  },
  { timestamps: true },
);
export default mongoose.models.Issue || mongoose.model("Issue", IssueSchema);
