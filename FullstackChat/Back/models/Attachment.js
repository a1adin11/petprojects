import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
    // Убираем поле value
    type: {
      type: String,
      required: true,
    },
    // Добавляем поле для хранения файла в GridFS
    gridFsId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attachment", AttachmentSchema);
