import Jimp from "jimp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketUrl } from "@wasp/shared/constants.js";

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
  return compositedImage.getBufferAsync(Jimp.MIME_PNG);
}

export async function uploadImageToR2(imageArray: Buffer, filename: string) {
  const upload = await S3.send(
    new PutObjectCommand({
      Bucket: "typergotchi",
      Key: filename,
      Body: imageArray,
      ContentType: "image/png",
    })
  );
}

export async function generateImage({
  daBoiSkinImg,
  daBoiArmorImg,
  daBoiFilename,
}: {
  daBoiSkinImg: string;
  daBoiArmorImg: string;
  daBoiFilename: string;
}) {
  const overlayedImage = await overlayImage(
    bucketUrl + daBoiSkinImg,
    bucketUrl + daBoiArmorImg
  );
  await uploadImageToR2(overlayedImage, daBoiFilename);
}
