import { generateImageJob } from "@wasp/jobs/generateImageJob.js";
import { bucketUrl } from "@wasp/shared/constants.js";
import fetch from "node-fetch";
import HttpError from "@wasp/core/HttpError.js";
import prismaClient from "@wasp/dbClient.js";
import { User } from "@wasp/entities";
import { Prisma } from "@prisma/client";

export async function getDaBoiImgUrls(skinId: number, armorId?: number) {
  async function getDaBoiSkinUrls() {
    const [daBoiHappySkinImg, daBoiSadSkinImg] = await Promise.all([
      prismaClient.daBoiSkin.findUnique({
        where: { id: skinId },
        select: { imgHappy: true },
      }),
      prismaClient.daBoiSkin.findUnique({
        where: { id: skinId },
        select: { imgSad: true },
      }),
    ]);
    if (!daBoiHappySkinImg || !daBoiSadSkinImg) {
      throw new HttpError(401);
    }
    return [daBoiHappySkinImg.imgHappy, daBoiSadSkinImg.imgSad];
  }
  if (!armorId) {
    const skins = await getDaBoiSkinUrls();
    return skins;
  }
  const happyDaBoiFilename =
    "generatedBoiz/" + skinId + "-happy-" + armorId + ".png";
  const sadDaBoiFilename =
    "generatedBoiz/" + skinId + "-sad-" + armorId + ".png";
  const [imgHappy, imgSad] = await Promise.all([
    fetch(bucketUrl + happyDaBoiFilename, {
      headers: {
        "Content-Type": "image/png",
      },
    }),
    fetch(bucketUrl + sadDaBoiFilename, {
      headers: {
        "Content-Type": "image/png",
      },
    }),
  ]);
  if (imgHappy.status == 404 || imgSad.status == 404) {
    const [daBoiHappySkinImg, daBoiSadSkinImg] = await getDaBoiSkinUrls();
    const daBoiArmorImg = await prismaClient.daBoiArmor.findUnique({
      where: { id: armorId },
      select: { img: true },
    });
    if (!daBoiHappySkinImg || !daBoiHappySkinImg || !daBoiArmorImg) {
      throw new HttpError(401);
    }
    await Promise.all([
      generateImageJob.submit({
        daBoiSkinImg: daBoiHappySkinImg,
        daBoiArmorImg: daBoiArmorImg.img,
        daBoiFilename: happyDaBoiFilename,
      }),
      generateImageJob.submit({
        daBoiSkinImg: daBoiSadSkinImg,
        daBoiArmorImg: daBoiArmorImg.img,
        daBoiFilename: sadDaBoiFilename,
      }),
    ]);
  }
  return [happyDaBoiFilename, sadDaBoiFilename];
}
