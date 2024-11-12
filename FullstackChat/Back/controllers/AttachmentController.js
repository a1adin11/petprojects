import Attachment from "../models/Attachment.js";
import mongoBucket from "../utils/utilsConfig.js";

export const pushUploads = async (req, res) => {
  console.log("start upload");
  console.log(req.files);

  try {
    const files = req.files;

    const attachmentId = await Promise.all(
      files.map(async (file) => {
        const bucket = await mongoBucket.getGridFSBucket(); // Получите объект GridFSBucket

        const uploadStream = bucket.openUploadStream(file.filename, {
          contentType: file.mimetype,
        });
        uploadStream.write(file.buffer);
        await uploadStream.end();

        const attachmentId = uploadStream.id.toString();

        const attachment = new Attachment({
          file_name: file.originalname,
          type: file.mimetype,
          gridFsId: attachmentId,
        });

        await attachment.save();
        console.log("Attachment сохранен!");

        return attachmentId;
      })
    );

    res
      .status(201)
      .json({ message: "Вложения успешно загружены!", attachmentId });
  } catch (error) {
    console.error("Ошибка при загрузке вложений:", error);
    res.status(500).send({ message: "Ошибка при загрузке вложений!" });
  }
};
