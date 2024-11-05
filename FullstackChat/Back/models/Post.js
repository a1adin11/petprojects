import { randomUUID } from "crypto";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: true,
    // },
    text: {
      type: String,
      required: true,
    },
    attachment: {
      type: [String]
    },
    tags: {
      type: [String],
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likedUsers: {
      type: Array,
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
