import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

import {
  createPostValidation,
  loginValidation,
  registerValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import handelValidationErrors from "./utils/handelValidationErrors.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB is failed =>", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handelValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handelValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", createPostValidation, PostController.getAll);
app.get("/posts/:id", createPostValidation, PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  createPostValidation,
  handelValidationErrors,
  PostController.create
);
app.delete(
  "/posts/:id",
  checkAuth,
  createPostValidation,
  PostController.remove
);
app.patch(
  "/posts/:id",
  checkAuth,
  createPostValidation,
  handelValidationErrors,
  PostController.update
);

app.listen(port, (err) => {
  if (err) {
    console.log("Server failed");
  }
  console.log(`Server is running at http://localhost:${port}`);
});
