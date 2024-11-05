import mongoose from "mongoose";
  import Grid from 'mongoose-gridfs';

  const AttachmentSchema = new mongoose.Schema(
   {
    // post_id: {
    //  type: mongoose.Schema.Types.ObjectId,
    //  ref: "Post",
    //  required: true,
    // },
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
     required: true
    } 
   },
   {
    timestamps: true,
   }
  );

  // Инициализация GridFS
  AttachmentSchema.plugin(Grid, {
   model: 'Attachment',
   collection: 'fs' // Имя коллекции GridFS
  });

  export default mongoose.model("Attachment", AttachmentSchema);