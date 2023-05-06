import {
  FetchDaBoiSkins,
  FetchDaBoiArmor,
  GetDaBoiImgUrls,
} from "@wasp/queries/types";
import { DaBoiSkin, DaBoiArmor } from "@wasp/entities";
import { generateImageJob } from "@wasp/jobs/generateImageJob.js";
import { bucketUrl } from "@wasp/shared/constants.js";
import fetch from "node-fetch";
import HttpError from "@wasp/core/HttpError.js";

export const getDaBoiSkins: FetchDaBoiSkins<Object, DaBoiSkin[]> = (
  _args,
  context
) => {
  return context.entities.DaBoiSkin.findMany({});
};

export const getDaBoiArmor: FetchDaBoiArmor<
  { maxPrice: number },
  DaBoiArmor[]
> = ({ maxPrice }, context) => {
  return context.entities.DaBoiArmor.findMany({
    where: { price: { lte: maxPrice } },
  });
};

export const getDaBoiImgUrls: GetDaBoiImgUrls<
  { skinId: DaBoiSkin["id"]; armorId: DaBoiArmor["id"] },
  string[]
> = async ({ skinId, armorId }, context) => {
  const happyDaBoiFilename = "generatedBoiz/" + skinId + "-happy-" + armorId;
  const sadDaBoiFilename = "generatedBoiz/" + skinId + "-sad-" + armorId;
  const [imgHappy, imgSad] = await Promise.all([
    fetch(bucketUrl + happyDaBoiFilename, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    }),
    fetch(bucketUrl + sadDaBoiFilename, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    }),
  ]);
  if (imgHappy.status == 404 || imgSad.status == 404) {
    const daBoiHappySkinImg = context.entities.DaBoiSkin.findFirst({
      where: { id: skinId },
      select: { imgHappy: true },
    });
    const daBoiSadSkinImg = context.entities.DaBoiSkin.findFirst({
      where: { id: skinId },
      select: { imgSad: true },
    });
    const daBoiArmorImg = context.entities.DaBoiArmor.findFirst({
      where: { id: armorId },
      select: { img: true },
    });
    if (!daBoiHappySkinImg || !daBoiHappySkinImg || !daBoiArmorImg) {
      throw new HttpError(401);
    }
    await Promise.all([
      generateImageJob.submit({
        daBoiHappySkinImg,
        daBoiArmorImg,
        happyDaBoiFilename,
      }),
      generateImageJob.submit({
        daBoiSadSkinImg,
        daBoiArmorImg,
        sadDaBoiFilename,
      }),
    ]);
  }
  return [happyDaBoiFilename, sadDaBoiFilename];
};
