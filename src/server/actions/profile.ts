import HttpError from "@wasp/core/HttpError.js";
import {
  RegisterStep2,
  ChangeNickname,
  SetDaBoiSkin,
  SetDaBoiArmor,
} from "@wasp/actions/types";
import { User } from "@wasp/entities";
import { getDaBoiImgUrls } from "../getDaBoiImgUrls.js";
import { getDaBoiSkins } from "../queries/daBoi";

export const registerStep2: RegisterStep2<
  Pick<
    User,
    "nickname" | "description" | "daBoiSelectedSkinId" | "daBoiSelectedArmorId"
  >,
  User
> = async (
  { nickname, description, daBoiSelectedSkinId, daBoiSelectedArmorId },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const userWithUsedNickname = await context.entities.User.findUnique({
    where: { nickname: nickname ?? undefined },
  });
  if (userWithUsedNickname && userWithUsedNickname.id !== context.user.id) {
    throw new HttpError(409);
  }
  const [daBoiHappyImg, daBoiSadImg] = await getDaBoiImgUrls(
    daBoiSelectedSkinId,
    daBoiSelectedArmorId
  );

  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      nickname,
      description,
      daBoiSelectedSkinId,
      daBoiSelectedArmorId,
      daBoiHappyImg,
      daBoiSadImg,
    },
  });
};

export const changeNickname: ChangeNickname<
  Pick<User, "nickname">,
  User
> = async ({ nickname }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const userWithUsedNickname = await context.entities.User.findUnique({
    where: { nickname: nickname ?? undefined },
  });
  if (userWithUsedNickname && userWithUsedNickname.id !== context.user.id) {
    throw new HttpError(409);
  }
  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      nickname,
    },
  });
};

export const setDaBoiSkin: SetDaBoiSkin<
  Pick<User, "daBoiSelectedSkinId">,
  User
> = async ({ daBoiSelectedSkinId }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      daBoiSelectedSkinId: daBoiSelectedSkinId,
    },
  });
};

export const setDaBoiArmor: SetDaBoiArmor<
  Pick<User, "daBoiSelectedArmorId">,
  User
> = async ({ daBoiSelectedArmorId }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const userHaveSkin = await context.entities.Inventory.findUnique({
    where: {
      userId: context.user.id,
      armorId: daBoiSelectedArmorId ?? undefined,
    },
  });
  if (!userHaveSkin) {
    throw new HttpError(409);
  }
  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      daBoiSelectedArmorId,
    },
  });
};
