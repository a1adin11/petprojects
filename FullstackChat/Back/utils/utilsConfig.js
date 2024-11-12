import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoClient, GridFSBucket } from "mongodb";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import g from "gridfs-stream";

dotenv.config();

export let gfs;

export const port = process.env.PORT || 3000;

export const DbConnection = async () => {
  return await mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
      console.log("DB connected");
    })
    .catch((err) => console.error("DB connection failed:", err));
};

mongoose.connection.on("connected", async () => {
  console.log("start init GridFS");
  gfs = await g(
    mongoose.connection.db,
    mongoose.connection.db.collection("uploads.files")
  );
  console.log("GridFS successfully initialized");
});

export const mongoBucket = {
  mongoUrl: process.env.MONGO_URL, // Получите URL подключения из переменной окружения
  databaseName: `${mongoose.connection.name}`, // Замените на имя базы данных
  getGridFSBucket: async () => {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    const db = client.db(mongoose.connection.name);
    return new GridFSBucket(db);
  },
};

// Настройка GridFs Storage
// export const storage = new GridFsStorage({
//   url: process.env.MONGO_URL,
//   file: async (req, file) => {
//     return new Promise((resolve, reject) => {
//       try {
//         const filename = `${Date.now()}-${file.originalname}`;
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//         };
//         console.log(fileInfo); // _id будет добавлен multer-gridfs-storage

//         resolve(fileInfo);
//       } catch (e) {
//         reject(e);
//       }
//     });
//   },
// });

const storage = multer.memoryStorage(); // Хранение в памяти

export const upload = multer({ storage });
export default mongoBucket;
