import Jimp from "jimp";

const daBoiImgWidth = 512;
const daBoiImgHeight = 512;
const fileserver = "";

export async function overlayImage(
  daBoiSkin: string,
  armor: string,
  filename: string
) {
  let daBoiSkinImg = await Jimp.read(daBoiSkin);
  daBoiSkinImg = daBoiSkinImg.resize(daBoiImgWidth, daBoiImgHeight);

  let daBoiArmorImg = await Jimp.read(armor);
  daBoiArmorImg = daBoiArmorImg.resize(daBoiImgWidth, daBoiImgHeight);

  daBoiSkinImg.composite(daBoiArmorImg, 0, 0);
  await daBoiSkinImg.writeAsync(fileserver + filename);
}
