import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    attachments: {
      type: [String],
      required: false,
    },
    tags: {
      type: [String],
      required: false,
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
