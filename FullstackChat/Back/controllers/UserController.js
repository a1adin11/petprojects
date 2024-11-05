import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import UserModel from "../models/User.js";

dotenv.config();

export const register = async (req, res) => {
 try {
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10).catch(err => {
   console.error('Ошибка при генерации соли:', err);
   return res.status(500).json({ message: 'Ошибка регистрации' });
  });
  const hash = await bcrypt.hash(password, salt).catch(err => {
   console.error('Ошибка при хэшировании пароля:', err);
   return res.status(500).json({ message: 'Ошибка регистрации' });
  });
  const existingUser = await UserModel.findOne({ email: req.body.email });

  if (existingUser) {
   return res.status(409).json({
    message: "Пользователь с таким адресом электронной почты уже существует.",
   });
  }

  const doc = new UserModel({
   email: req.body.email,
   fullName: req.body.fullName,
   avatarUrl: req.body.avatarUrl,
   passwordHash: hash,
  });

  const user = await doc.save();

  const token = jwt.sign(
   {
    _id: user._id,
   },
   process.env.SECRET_KEY,
   { expiresIn: "30d" }
  );

  const { passwordHash, ...userData } = user._doc;

  res.json({ ...userData, token });
 } catch (err) {
  console.error('Ошибка регистрации:', err);
  res.status(500).json({
   message: "Не удалось зарегистрироваться",
  });
 }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!passwordIsValid) {
      return res.status(400).json({
        message: "invalid password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Срок действия токена истек. Пожалуйста, войдите снова.",
      });
    }

    console.log(err);
    res.status(500).json({
      message: "Не удалость авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
