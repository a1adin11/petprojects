import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const createPostValidation = [
  body("title").isLength({ min: 3 }).isString(),
  body("text").isLength({ min: 10 }).isString(),
  body("tags")
    .optional()
    .isArray()
    .custom((value) => {
      if (value.some((tag) => typeof tag !== "string")) {
        throw new Error("All tags must be strings");
      }
      return true;
    }),
  body("imageUrl").optional().isString(),
];