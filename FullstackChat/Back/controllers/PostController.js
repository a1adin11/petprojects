import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  console.log(req.body);

  try {
    console.log(req.body);

    const doc = new PostModel({
      text: req.body.text,
      tags: req.body.tags,
      user: req.userId,
      attachments: req.body.attachments,
    });

    const post = await doc.save();

    res.json(post);
  } catch (e) {
    console.log(e, "не удалось создать пост");
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    )
      .then((doc) => {
        if (!doc) {
          throw Error;
        }
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "Пост не найден" });
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить пост",
    });
  }
};

export const setLike = async (req, res) => {
  try {
    const postId = req.body.id;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    const isLiked = post.likedUsers.includes(userId);

    let updatedPost;

    if (isLiked) {
      updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {
          $inc: { likesCount: -1 },
          $pull: { likedUsers: userId },
        },
        { returnDocument: "after" }
      );
    } else {
      updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {
          $inc: { likesCount: 1 },
          $push: { likedUsers: userId },
        },
        { returnDocument: "after" }
      );
    }
    res.json({
      ...updatedPost._doc, // Все поля документа
      isLiked, // Добавляем поле isLiked
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить пост",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          throw Error;
        }
        console.log(doc);

        res.json({
          message: "delete successful",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "Пост не найден" });
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить пост",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
    };
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        $set: updateData,
      }
    )
      .then((doc) => {
        if (!doc) {
          throw Error;
        }
        console.log(doc);

        res.json({
          message: "update successful",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "Ну удалось обновить пост" });
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось обновить пост",
    });
  }
};



//FIXME: Что то не так с patch запросом, доделать
