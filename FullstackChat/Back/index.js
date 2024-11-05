import express from "express";
import cors from "cors";

import {
  createPostValidation,
  loginValidation,
  registerValidation,
} from "./validations.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import * as AttachmentController from "./controllers/AttachmentController.js";

import handelValidationErrors from "./middlewares/handelValidationErrors.js";
import isMyContent from "./middlewares/isMyContent.js";
import checkAuth from "./middlewares/checkAuth.js";
import * as config from "./utils/utilsConfig.js";

config.DbConnection();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Добавьте допустимые адреса
  credentials: true, // Разрешить куки
};

app.use(cors(corsOptions));

app.use(express.json());

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

app.post(
  "/upload",
  config.upload.array("files", 10),
  AttachmentController.pushUploads
);

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
  isMyContent,
  createPostValidation,
  PostController.remove
);

app.patch(
  "/posts/:id",
  checkAuth,
  isMyContent,
  createPostValidation,
  handelValidationErrors,
  PostController.update
);

app.patch("/like", checkAuth, PostController.setLike);

app.listen(config.port, (err) => {
  if (err) {
    console.log("Server failed");
  }
  console.log(`Server is running at http://localhost:${config.port}`);
});
