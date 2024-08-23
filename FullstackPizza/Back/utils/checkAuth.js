import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.userId = decoded._id;
      next();
    } catch (err) {
      console.log(err);
      console.log(req.headers.authorization.replace(/Bearer\s?/, ""));

      return res.status(403).json({
        message: "Доступ ограничен",
      });
    }
  } else {
    return res.status(403).json({
      message: "Доступ ограничен",
    });
  }
  // res.send(token);
};
