import Attachment from "../models/Post.js";

import * as config from "../utils/utilsConfig.js";

export const pushUploads = async (req, res) => {
  try {
    // const postId = req.params.postId;
    const files = req.files;

    // Сохраняем файлы и создаем связи с постом
    const attachmentIds = await Promise.all(
      files.map(async (file) => {
        // Создаем write stream для GridFS
        const writeStream = config.gfs.createWriteStream({
          filename: file.filename,
          mode: "w", // Режим записи
          content_type: file.mimetype,
        });

        // Перенаправляем данные файла в write stream
        writeStream.on("close", (file) => {
          // Сохраняем информацию о файле в модели Attachment
          const attachment = new Attachment({
            // post_id: postId,
            file_name: file.filename,
            type: file.contentType,
            gridFsId: file._id, // ID файла из GridFS
          });

          attachment
            .save()
            .then(() => console.log("Attachment сохранен!"))
            .catch((err) =>
              console.error("Ошибка при сохранении Attachment:", err)
            );
        });

        writeStream.on("error", (err) => {
          console.error("Ошибка при записи в GridFS:", err);
        });

        writeStream.write(file.buffer); // Перенаправляем данные файла
        writeStream.end(); // Закрываем поток
      })
    );

    res
      .status(201)
      .json({ message: "Вложения успешно загружены!", attachmentIds });
  } catch (error) {
    console.error("Ошибка при загрузке вложений:", error);
    res.status(500).send({ message: "Ошибка при загрузке вложений!" });
  }
};
