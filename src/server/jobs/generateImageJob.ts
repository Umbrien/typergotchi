import Jimp from "jimp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const daBoiImgWidth = 512;
const daBoiImgHeight = 512;

const S3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_API_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_TOKEN!,
    secretAccessKey: process.env.R2_SECRET_TOKEN!,
  },
});

export async function overlayImage(daBoiSkin: string, armor: string) {
  let daBoiSkinImg = await Jimp.read(daBoiSkin);
  daBoiSkinImg = daBoiSkinImg.resize(daBoiImgWidth, daBoiImgHeight);

  let daBoiArmorImg = await Jimp.read(armor);
  daBoiArmorImg = daBoiArmorImg.resize(daBoiImgWidth, daBoiImgHeight);

  const compositedImage = daBoiSkinImg.composite(daBoiArmorImg, 0, 0);
  return await compositedImage.getBufferAsync(Jimp.MIME_JPEG);
}

export async function uploadImageToR2(imageArray: Buffer, filename: string) {
  const upload = await S3.send(
    new PutObjectCommand({
      Bucket: "typergotchi",
      Key: filename,
      Body: imageArray,
      ContentType: "image/jpeg",
    })
  );
}

export async function generateImage(
  daBoiSkin: string,
  armor: string,
  filename: string
) {
  uploadImageToR2(await overlayImage(daBoiSkin, armor), filename);
}
