import HttpError from "@wasp/core/HttpError.js";
import { Context, inventoryContext } from "../_types";
import {
  ChangeNickname,
  SetDaBoiSkin,
  SetDaBoiArmor,
} from "@wasp/actions/types";
import { Inventory, SoloPassing, User } from "@wasp/entities";

export const changeNickname: ChangeNickname<
  Pick<User, "nickname">,
  User
> = async ({ nickname }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const nicknameUsed = await context.entities.User.findUnique({
    where: { nickname: nickname ?? undefined },
  });
  if (nicknameUsed) {
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
