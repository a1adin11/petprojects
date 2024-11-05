import mongoose from "mongoose";
import dotenv from "dotenv";
import { GridFsStorage } from "multer-gridfs-storage";
import pkg from "gridfs-stream";
import multer from "multer";

const { Grid } = pkg;
let gfs;

dotenv.config();

export const port = process.env.PORT || 3000;

export const DbConnection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("DB connected"))
      .catch((err) => console.error("DB connection failed:", err));

    // Инициализация GridFS после успешного подключения
    try {
      mongoose.connection.once("open", () => {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          bucketName: "uploads",
        });

        gfs = {
          bucket,
          model: mongoose.model(
            "uploads",
            mongoose.Schema({
              filename: String,
              contentType: String,
            })
          ),
        };

        console.log("GridFS successfully initialized");
      });
    } catch (error) {
      console.error("GridFS connection failed", error);
    }
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

// Настройка GridFs Storage
export const storage = new GridFsStorage({
  url: process.env.MONGO_URL, // Используйте переменные среды
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

export const upload = multer({ storage });
