import PostModel from "../models/Post.js";

export default async (req, res, next) => {
  try {
    const currentPost = await PostModel.findById(req.params.id);

    if (currentPost && currentPost.user.toString() === req.userId.toString()) {
      next();
    } else {
      return res.status(403).json({
        message: "У вас недостаточно прав",
      });
    }
  } catch (error) {
    console.error("Ошибка мидлвара поста:", error);
    return res.status(500).json({ message: "Ошибка мидлвара поста:" });
  }
};
