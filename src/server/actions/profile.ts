import HttpError from "@wasp/core/HttpError.js";
import { Context } from "../_types";

export async function registerStep2(
  {
    nickname,
    bio,
    daBoiSelectedSkinId,
  }: {
    nickname: string;
    bio?: string;
    daBoiSelectedSkinId: number;
  },
  context: Context
) {
  if (!context.user) {
    throw new HttpError(401);
  }

  const nicknameIsUsed = await context.entities.User.findUnique({
    where: { nickname },
  });
  if (nicknameIsUsed) {
    throw new HttpError(409);
  }

  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      nickname,
      description: bio,
      daBoiSelectedSkinId,
    },
  });
}

export async function changeNickname(
  { nickname }: { nickname: string },
  context: Context
) {
  if (!context.user) {
    throw new HttpError(401);
  }
  const nickname_used = await context.entities.User.findUnique({
    where: { nickname },
  });
  if (nickname_used) {
    throw new HttpError(409);
  }
  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      nickname,
    },
  });
}

export async function changeDaBoiSkin(
  { daBoiId }: { daBoiId: number },
  context: Context
) {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      daBoiSelectedSkinId: daBoiId,
    },
  });
}
