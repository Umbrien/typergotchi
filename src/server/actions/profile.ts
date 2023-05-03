import HttpError from '@wasp/core/HttpError.js';
import { Context, inventoryContext } from "../_types";
  
export async function changeNickname(
  { nickname }: { nickname: string },
  context: Context
){
  if (!context.user) {
    throw new HttpError(401);
  }
  const nicknameUsed = await context.entities.User.findUnique({
    where: { nickname }
  });
  if (nicknameUsed){
    throw new HttpError(409);
  }
  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      nickname
    }
  })
}

export async function setDaBoiSkin(
  { daBoiSkinId }: { daBoiSkinId: number },
  context: Context
){
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      daBoiSelectedSkinId: daBoiSkinId
    }
  })
}

export async function setDaBoiArmor(
  { daBoiArmorId }: { daBoiArmorId: number },
  context: inventoryContext
){
  if (!context.user) {
    throw new HttpError(401);
  }
  const userHaveSkin = await context.entities.Inventory.findUnique({
    where: {
      userId: context.user.id,
      armorId: daBoiArmorId
    }
  });
  if (!userHaveSkin){
    throw new HttpError(409);
  }
  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      daBoiSelectedArmorId: daBoiArmorId
    }
  })  
}
